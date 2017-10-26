import { defineTest } from 'jscodeshift/dist/testUtils';

defineTest(__dirname, './src/propsToFlow', null, 'flowComment1');
defineTest(__dirname, './src/propsToFlow', null, 'flowComment2');
defineTest(__dirname, './src/propsToFlow', null, 'flowComment3');

const removePropTypesOptions = {
  'remove-prop-types': true,
};

defineTest(__dirname, './src/propsToFlow', null, 'classWithoutSuper');

defineTest(__dirname, './src/propsToFlow', null, 'classPropTypesToFlow1');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow2');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow3');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow4');
defineTest(__dirname, './src/propsToFlow', null, 'classPropTypesToFlow5');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'classPropTypesToFlow6');

defineTest(__dirname, './src/propsToFlow', null, 'funcComponentPropTypes1');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'funcComponentPropTypes2');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'funcComponentPropTypes3');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'funcComponentPropTypes4');
defineTest(__dirname, './src/propsToFlow', null, 'funcComponentPropTypes5');
defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'funcComponentPropTypes6');

defineTest(__dirname, './src/propsToFlow', removePropTypesOptions, 'propTypesAsVariable1');
