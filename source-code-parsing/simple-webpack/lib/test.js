const path = require('path');
const { getAST,getDependencis,transform } = require('./parser');

const ast = getAST(path.join(__dirname,'../src/index.js'))
const dependens =getDependencis(ast)
// console.log(ast);
// console.log(dependens);

const code  = transform(ast)
console.log(code);