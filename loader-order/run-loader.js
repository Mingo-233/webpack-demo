const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
  // String: 资源的绝对路径(可以增加查询字符串)
  resource: path.join(__dirname, './src/demo.txt'),
  // String[]: loader 的绝对路径(可以增加查询字符串)
  loaders:[
    path.join(__dirname,'./src/raw-loader.js'),
  ],
  // 基础上下文之外的额外 loader 上下文
  context:{
    minimize:true
  },
  // 读取资源的函数 (或者说读取文件的方法，用什么方式去读取资源)
  readResource:fs.readFile.bind(fs)
},(err,result)=>{
  err ? console.log(err):console.log(result)
})
