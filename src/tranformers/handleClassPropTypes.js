import { get } from 'lodash';
import isReactClass from '../util/isReactClass';
import createTypeAnnotation from '../util/createTypeAnnotation';
import getPropTypesStatement from '../util/getPropTypesStatement';
import getTypeAliasName from '../util/getTypeAliasName';
import getPropTypesObject from '../util/getPropsTypesObject';

const getStaticPropTypes = (j, path) =>
  j(path).find(j.ClassProperty, {
    key: {
      type: 'Identifier',
      name: 'propTypes',
    },
  });

const createPropsTypeAnnotation = (j, typeAliasName) =>
  j.genericTypeAnnotation(j.identifier(typeAliasName), null);

const createSuperTypeParameters = (j, typeParameteres, typeAliasName) => {
  if (typeParameteres) {
    const firstTypeParam = get(typeParameteres, 'params[0]');
    if (firstTypeParam && firstTypeParam.id.name === typeAliasName) {
      return typeParameteres;
    }

    const propsTypeAnnotation = createPropsTypeAnnotation(j, typeAliasName);
    return { ...typeParameteres, params: [propsTypeAnnotation, ...typeParameteres.params] };
  }
  return j.typeParameterInstantiation([createPropsTypeAnnotation(j, typeAliasName)]);
};

export default (j, ast, options) => {
  const classComponents = ast
    .find(j.ClassDeclaration)
    .filter(({ node }) => (
      isReactClass(node.superClass) &&
      (!node.superTypeParameters || !node.superTypeParameters.params.length)
    ));

  const typeAliases = [];

  if (!classComponents.length) {
    return typeAliases;
  }

  classComponents.forEach((path) => {
    const { node } = path;
    const staticPropTypes = getStaticPropTypes(j, path);
    let propTypesStatement;
    let propTypesObject;

    if (!staticPropTypes.length) {
      propTypesStatement = getPropTypesStatement(j, ast, node.id.name);
      if (!propTypesStatement.length) {
        return;
      }

      propTypesObject = getPropTypesObject(
        j,
        ast,
        propTypesStatement.get().node.expression,
        options,
      );
    } else {
      propTypesObject = getPropTypesObject(j, ast, staticPropTypes.get().node, options);
    }

    const typeAliasName = getTypeAliasName(node.id.name);

    typeAliases.push(createTypeAnnotation(j, propTypesObject, ast, typeAliasName));

    if (options['remove-prop-types']) {
      if (staticPropTypes.length) {
        staticPropTypes.remove();
      } else {
        propTypesStatement.remove();
      }
    }

    node.superTypeParameters = createSuperTypeParameters(
      j,
      node.superTypeParameters,
      typeAliasName,
    );
  });

  return typeAliases;
};
