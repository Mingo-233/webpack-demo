const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');

module.exports = {
  // 得到ast
  getAST: (path) => {
    const content = fs.readFileSync(path, 'utf-8')
    const ast = babylon.parse(content, {
      sourceType: 'module'
    })
    // console.log(ast);
    return ast
  },
  // 分析依赖 (当前文件引入了哪些依赖)
  getDependencis: (ast) => {
    const dependencies = []
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      }
    });
    return dependencies;
  },
  // ast转化es5语法
  transform:(ast)=>{
    const {code} = transformFromAst(ast,null,{
      presets:['env']
    })

    return code
  }
}
