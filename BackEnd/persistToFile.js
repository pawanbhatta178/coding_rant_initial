const fs=require('fs').promises;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const persistToFile=async (source, extension)=>{
    let filename="userCode."+extension; 
    let targetFolder="1234";
    let returnVal={};

    try{
    await fs.writeFile(`./codeToCompile/${targetFolder}/${filename}`,source);
    }
    catch(error){
        return returnVal={
            err:"Internal server error.(1)"
        };  
    }

    const exec_options={
        env:null,
        encoding:'utf8',
        maxBuffer:200*1024,
        killSignal: 'SIGTERM',
        timeout:1000
    }
    try{
    const {stdout,stderr}=await exec(`docker run --rm -v "$(pwd)"/codeToCompile/${targetFolder}:/usr/src/app/task   655539e594a9   timeout 2 sh ./script.sh`,exec_options);
    }
    catch(error){
      return returnVal={
          err: `Syntax/Runtime/InfiniteLoop Error`
      };  
    }

    try{
    const output=await fs.readFile(`./codeToCompile/${targetFolder}/testOutput.json`,'utf-8');
    returnVal={
        output
    }
    return returnVal;
    }
    catch(err){
        return returnVal={
            err:"Internal Server Error.(2)"
        };
    }
}

module.exports=persistToFile;