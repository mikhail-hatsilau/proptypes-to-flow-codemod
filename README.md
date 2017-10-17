# PropTypes to Flow codemod

## Setup and usage
Before usage of the codemod you should install [jscodeshift](https://github.com/facebook/jscodeshift#install) first.

1. Clone repo
`git clone https://github.com/mikhail-hatsilau/proptypes-to-flow-codemod.git`

2. Run `npm install` inside codemod directory
3. Run `npm run build` to transpile javascript
4. Run `jscodeshift -t proptypes-to-flow-codemod/dist/propsToFlow.js <path>`