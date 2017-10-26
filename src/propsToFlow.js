import 'babel-polyfill';

import { flow, map, reduce, findIndex, findLastIndex, find } from 'lodash/fp';
import handleClassPropTypes from './tranformers/handleClassPropTypes';
import handleFunctionPropTypes from './tranformers/handleFunctionPropTypes';
import { isReactType, isImportDeclaration, isImportDeclarationReact } from './util/typeHelpers';

const addFlowComment = (j, ast) => {
  ast
    .find(j.Program)
    .forEach(path => {
      const { node } = path;
      const { body } = node;
      const firstNode = body.length ? body[0] : null;
      if (!firstNode) {
        return;
      }

      let { comments } = firstNode;
      comments = comments || [];
      firstNode.comments = comments;
      const existingFlowComment = find((comment) => comment.value.trim() === '@flow', firstNode.comments);

      if (existingFlowComment) {
        return;
      }

      comments.unshift(j.commentLine(' @flow'));
    });
};

const addTypeAliases = (j, ast, typeAliases) =>
  typeAliases.forEach(typeAlias => {
    ast
      .find(j.Program)
      .replaceWith(path => {
        const { node } = path;
        const indexFrom = findLastIndex(isImportDeclaration, node.body);
        node.body.splice(indexFrom + 1, 0, typeAlias);
        return node;
      });
  });

const getReactTypes = (j, typeAlias) => {
  const objectAnnotation = typeAlias.right;
  return reduce((types, property) => {
    const genericTypes = j(property).find(j.GenericTypeAnnotation).nodes();
    if (!genericTypes.length) {
      return types;
    }
    const reactTypes = genericTypes
      .filter(genericTypeNode => isReactType(genericTypeNode))
      .map(genericTypeNode => genericTypeNode.id.name);
    return [...types, ...reactTypes];
  }, [], objectAnnotation.properties);
};

const getTypesToImport = j => reduce((types, alias) => [...types, ...getReactTypes(j, alias)], []);

const createImportSpecifiersForTypes = j => map(type => j.importSpecifier(j.identifier(type)));


const getTypeImportDeclaration = (j, typeAliases) => flow(
  getTypesToImport(j),
  createImportSpecifiersForTypes(j),
  specifiers => (
    specifiers.length ? j.importDeclaration(specifiers, j.literal('react'), 'type') : null
  ),
)(typeAliases);

const addTypeImport = (j, ast, typeAliases) => {
  const importTypeDeclaration = getTypeImportDeclaration(j, typeAliases);
  if (importTypeDeclaration) {
    ast
      .find(j.Program)
      .replaceWith(path => {
        const { node } = path;
        const indexOfReactImport = findIndex(element => (
          isImportDeclaration(element) && isImportDeclarationReact(element)
        ), node.body);

        if (indexOfReactImport !== -1) {
          node.body.splice(indexOfReactImport + 1, 0, importTypeDeclaration);
        } else {
          node.body.unshift(importTypeDeclaration);
        }
        return node;
      });
  }
};

const removePropTypesImport = (j, ast) => {
  ast.find(j.ImportDeclaration, {
    source: {
      value: 'prop-types',
    },
  }).remove();
};

export const parser = 'flow';

const transformer = (fileInfo, { jscodeshift }, options) => {
  const ast = jscodeshift(fileInfo.source);

  const typeAliases = [
    ...handleClassPropTypes(jscodeshift, ast, options),
    ...handleFunctionPropTypes(jscodeshift, ast, options),
  ];
  addTypeAliases(jscodeshift, ast, typeAliases);
  addTypeImport(jscodeshift, ast, typeAliases);

  if (options['remove-prop-types']) {
    removePropTypesImport(jscodeshift, ast);
  }

  addFlowComment(jscodeshift, ast);

  return ast.toSource({
    lineTerminator: '\n',
    quote: 'single',
    trailingComma: true,
  });
};

export default transformer;
