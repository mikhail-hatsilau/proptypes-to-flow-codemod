import { isIdentifier } from './typeHelpers';

const typeOfPropTypesMap = {
  AssignmentExpression: node => node.right,
  ClassProperty: node => node.value,
};

const declarationPredicate = name => path =>
  isIdentifier(path.node.declarations[0].id) && path.node.declarations[0].id.name === name;

export default (j, ast, node, options) => {
  const propTypes = typeOfPropTypesMap[node.type](node);
  let propTypesObject = propTypes;
  if (isIdentifier(propTypes)) {
    const collection = ast
      .find(j.VariableDeclaration)
      .filter(declarationPredicate(propTypes.name));

    if (!collection.length) {
      console.error(`${propTypesObject} is not defined`);
      process.exit(1);
    }
    propTypesObject = collection.get().node.declarations[0].init;

    if (options['remove-prop-types']) {
      collection.remove();
    }
  }
  return propTypesObject;
};
