import { isMemberExpression, isIdentifier } from './typeHelpers';

const isObjectReact = (objectProp) =>
  isIdentifier(objectProp) && objectProp.name === 'React';

const isPropertyReactComponent = (property) =>
  isIdentifier(property) && (property.name === 'Component' || property.name === 'PureComponent');

const isMemberExpressionReact = (classNode) =>
  isMemberExpression(classNode) &&
  isObjectReact(classNode.object) && isPropertyReactComponent(classNode.property);

const isIdentifierReactComponent = (classNode) =>
  isIdentifier(classNode) && (classNode.name === 'Component' || classNode.name === 'PureComponent');

export default (classNode) =>
  isIdentifierReactComponent(classNode) || isMemberExpressionReact(classNode);
