export default (j, ast, name) =>
  ast.find(j.ExpressionStatement, {
    expression: {
      type: 'AssignmentExpression',
      left: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name,
        },
        property: {
          type: 'Identifier',
          name: 'propTypes',
        },
      },
    },
  });
