module.exports = function(source){
  const json = JSON.stringify(source)
  .replace(/sb/g,'**')
  .replace(/\u2028/g,'\\u2028')
  .replace(/\u2029/g,'\\u2029')

  return `export default ${json}`
}