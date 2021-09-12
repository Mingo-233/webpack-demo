const fs = require('fs');
const path = require('path');
const { getAST, getDependencis, transform } = require('./parser');

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run () {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule)
    this.modules.forEach((_module) => {
      // 遍历将第一层依赖中引用的依赖进行编译 (实际场景这样是需要递归的)
      _module.dependencies.forEach((dependency) => {
        this.modules.push(this.buildModule(dependency))
      })
    })
    this.emitFiles();
  }
  // 编译模块 输出内容：1目标模块文件名 2目标模块依赖名字 3目标模块转es5后的代码
  buildModule (filename, isEntry) {
    let ast;
    if (isEntry) {
      ast = getAST(filename)
    } else {
      // 拿绝对路径
      let absolutePath = path.join(process.cwd(), './src', filename)
      ast = getAST(absolutePath)
    }
    return {
      filename,
      dependencies: getDependencis(ast),
      transformCode: transform(ast)
    }
  }

  emitFiles () {
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = '';
    this.modules.forEach((_module) => {
      modules += `'${_module.filename}':function (require, module, exports) {${_module.transformCode}},`
    })

    const bundle = `
    (function(modules) {
      function require(fileName) {
          const fn = modules[fileName];

          const module = { exports : {} };

          fn(require, module, module.exports);

          return module.exports;
      }

      require('${this.entry}');
  })({${modules}})
    `
    const isExist = fs.existsSync(outputPath)
    if (isExist) {
      fs.writeFileSync(outputPath, bundle, 'utf-8');
    } else {
      fs.mkdirSync(this.output.path)
      fs.writeFileSync(outputPath, bundle, 'utf-8');
    }
  }

}