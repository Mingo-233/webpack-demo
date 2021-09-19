module.exports = class MyPlugin {
  constructor(options) {
    this.options = options
  }
  apply (compiler) {
    console.log('my plugins is executed');
    console.log(this.options);
    compiler.hooks.done.tap(' My Plugin', (stats /* stats is passed as argument when done hook is tapped. */) => { console.log('Hello World!'); });
  }
}