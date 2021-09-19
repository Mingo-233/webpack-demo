/* eslint-disable guard-for-in */
const JSZip = require('jszip')
const path = require('path');
const RawSource = require('webpack-sources').RawSource;

const zip = new JSZip()
module.exports = class zipPlugin {
  constructor(options) {
    this.options = options
  }
  apply (compiler) {
    console.log('zip plugins is executed');
    // emit 生成文件阶段的钩子，读取的是 compilation.assets 对象的值 ·可以将 zip 资源包设置到 compilation.assets 对象上，这样webpack就可以帮我们把文件生成出来
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      // 创建一个空的文件容器，options为传进来的参数
      const folder = zip.folder(this.options.filename);
      for (let filename in compilation.assets) {
        // console.log(filename);  mian.js
        // source方法会返回这个文件里面的内容（代码）
        const source = compilation.assets[filename].source();
        // 将代码放到文件容器中，并
        folder.file(filename, source);
      }
      zip.generateAsync({
        type: 'nodebuffer'
      }).then((content) => {
        const outputPath = path.join(
          compilation.options.output.path,
          this.options.filename + '.zip'
        );
        const outputRelativePath = path.relative(
          compilation.options.output.path,
          outputPath
        );
        // assets 在磁盘中生成文件，new RawSource(content)是生成一个压缩包文件

        compilation.assets[outputRelativePath] = new RawSource(content);
        // 最后一步一定要返回信号，也可以是return
        callback();
      });
    })
  }
}
