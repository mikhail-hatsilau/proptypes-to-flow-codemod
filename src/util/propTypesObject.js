import { isIdentifier } from './typeHelpers';

const typeOfPropTypesMap = {
  ExpressionStatement: path => path.node.expression.right,
  ClassProperty: path => path.node.value,
};

const declarationPredicate = name => path =>
  isIdentifier(path.node.declarations[0].id) && path.node.declarations[0].id.name === name;

const findPropTypesVarDeclarations = (j, ast, name) =>
  ast
    .find(j.VariableDeclaration)
    .filter(declarationPredicate(name));

export const getPropTypesObject = (j, ast, collection) => {
  const path = collection.get();
  const propTypes = typeOfPropTypesMap[path.node.type](path);
  let propTypesObject = propTypes;
  if (isIdentifier(propTypes)) {
    const declarationsCollection = findPropTypesVarDeclarations(j, ast, propTypes.name);

    if (!declarationsCollection.length) {
      console.error(`${propTypesObject} is not defined`);
    }
    propTypesObject = declarationsCollection.get().node.declarations[0].init;
  }
  return propTypesObject;
};

export const removePropTypesVariableDeclaration = (j, ast, collection) => {
  const path = collection.get();
  const propTypesValue = typeOfPropTypesMap[path.node.type](path);
  if (isIdentifier(propTypesValue)) {
    const declarationsCollection = findPropTypesVarDeclarations(j, ast, propTypesValue.name);
    declarationsCollection.remove();
  }
};
