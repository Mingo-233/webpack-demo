module.exports =class MyPlugin {
  constructor(options){
    this.options = options
  }
  apply(compiler){
    console.log('my plugins is executed');
    console.log(this.options);
  }
}