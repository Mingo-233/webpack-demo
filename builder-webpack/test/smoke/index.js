const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');
console.log('run');
const mocha = new Mocha({
  timeout: '10000ms'
});
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
      colors:true,
      modules: false,
      children: false,
      hash: true,
      timings: true,
    }));

    console.log('Webpack build success, begin run test.');
    mocha.addFile(path.join(__dirname, 'html-test.js'));
    mocha.addFile(path.join(__dirname, 'css-js-test.js'));
    mocha.run();
  })
})