import { reduce } from 'lodash/fp';
import getPropTypesStatement from '../util/getPropTypesStatement';
import createTypeAnnotation from '../util/createTypeAnnotation';
import getTypeAliasName from '../util/getTypeAliasName';
import { isIdentifier, isBlockStatement } from '../util/typeHelpers';
import getPropTypesObject from '../util/getPropsTypesObject';

const buildFunctionInfo = (name, func) => ({ name, func });

const getFunctionDeclarations = (j, ast) =>
  ast
    .find(j.FunctionDeclaration)
    .nodes()
    .map(node => buildFunctionInfo(node.id.name, node));

const getFunctionExpressions = (j, ast) =>
  ast
    .find(j.VariableDeclarator, {
      init: {
        type: 'FunctionExpression',
      },
    })
    .nodes()
    .map(node => buildFunctionInfo(node.id.name, node.init));

const getArrowFunctions = (j, ast) =>
  ast
    .find(j.VariableDeclarator, {
      init: {
        type: 'ArrowFunctionExpression',
      },
    })
    .nodes()
    .map(node => buildFunctionInfo(node.id.name, node.init));

const createVariableDeclaration = (j, kind, id, init) =>
  j.variableDeclaration(kind, [j.variableDeclarator(id, init)]);

const getPotentialFunctionalComponents = (j, ast) =>
  [
    ...getFunctionDeclarations(j, ast),
    ...getFunctionExpressions(j, ast),
    ...getArrowFunctions(j, ast),
  ];

/* eslint no-param-reassign: 0 */
const addTypeAnnotationToFunction = (j, funcNode, typeAliasName) => {
  if (!funcNode.params.length) {
    return;
  }

  const typeAnnotation = j.typeAnnotation(j.genericTypeAnnotation(
    j.identifier(typeAliasName),
    null,
  ));
  const props = funcNode.params[0];

  if (isIdentifier(props)) {
    props.typeAnnotation = typeAnnotation;
  } else {
    funcNode.params[0] = j.identifier('props');
    funcNode.params[0].typeAnnotation = typeAnnotation;
    if (!isBlockStatement(funcNode.body)) {
      const returnValue = funcNode.body;
      funcNode.body = j.blockStatement([j.returnStatement(returnValue)]);
    }
    funcNode.body.body.unshift(createVariableDeclaration(j, 'const', props, j.identifier('props')));
  }
};

export default (j, ast, options) => {
  const potentialFunctionalComponents = getPotentialFunctionalComponents(j, ast);
  const typeAliases = reduce((types, { name, func }) => {
    const propTypesStatement = getPropTypesStatement(j, ast, name);
    if (!propTypesStatement.length) {
      return types;
    }
    const typeAliasName = getTypeAliasName(name);
    const propTypesObject = getPropTypesObject(
      j,
      ast,
      propTypesStatement.get().node.expression,
      options,
    );
    const typeAnnotation = createTypeAnnotation(j, propTypesObject, ast, typeAliasName);
    if (options['remove-prop-types']) {
      propTypesStatement.remove();
    }
    addTypeAnnotationToFunction(j, func, typeAliasName);

    return [...types, typeAnnotation];
  }, [], potentialFunctionalComponents);

  return typeAliases;
};

