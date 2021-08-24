const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
// const Mocha = require('mocha');
console.log('run');

// 改变当前运行目录
process.chdir(path.join(__dirname, 'template'));
rimraf('./dist',()=>{
  const prodConfig = require('../../lib/webpack.prod.js');
  
  webpack(prodConfig,(err,stats)=>{
    if(err){
      console.error(err);
      process.exit(2)
    }
    console.log(stats.toString({
      color:true,
      modules: false,
      children: false
    }));
  })
})