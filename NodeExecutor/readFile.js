const fs = require('fs')

const readFile=(fileName,callback)=>{
  fs.readFile(fileName.toString(),'utf-8',callback)
}
module.exports =readFile;