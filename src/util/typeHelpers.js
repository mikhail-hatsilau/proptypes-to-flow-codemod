const REACT_TYPES = new Set([
  'Node',
  'Element',
]);

export const isMemberExpression = (node) =>
  node.type === 'MemberExpression';

export const isLiteral = (node) =>
  node.type === 'Literal';

export const isGenericTypeAnnotation = node =>
  node.type === 'GenericTypeAnnotation';

export const isReactType = node =>
  REACT_TYPES.has(node.id.name);

export const isImportDeclaration = node =>
  node.type === 'ImportDeclaration';

export const isImportDeclarationReact = node =>
  node.source.value === 'react';

export const isIdentifier = node =>
  node.type === 'Identifier';

export const isArrowFunction = node =>
  node.type === 'ArrowFunctionExpression';

export const isBlockStatement = node =>
  node.type === 'BlockStatement';
