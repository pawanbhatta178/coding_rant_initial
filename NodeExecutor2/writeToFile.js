const fs = require('fs')

const writeToFile=(fileName,data,callback)=>{
    fs.writeFile(fileName, data, callback)
}
module.exports =writeToFile;