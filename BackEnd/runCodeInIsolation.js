const fs=require('fs').promises;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const runCodeInIsolation = async ({ code, lang, tests }) => {
    console.log(tests);
    let filename="userCode."+lang; 
    let targetFolder="1234";
    let returnVal = {};
    try {
        await fs.writeFile(`./codeToCompile/${targetFolder}/answerKey.json`,JSON.stringify(tests))
        await fs.writeFile(`./codeToCompile/${targetFolder}/${filename}`, code);
        const exec_options={
            env:null,
            encoding:'utf8',
            maxBuffer:200*1024,
            killSignal: 'SIGTERM',
            timeout:1000
        }
        await exec(`docker run --rm -v "$(pwd)"/codeToCompile/${targetFolder}:/usr/src/app/task   655539e594a9   sh ./script.sh`, exec_options);
        
        try {
         const testResult=  await fs.readFile(`./codeToCompile/${targetFolder}/testOutput.json`, 'utf-8');
            returnVal['testResult'] = JSON.parse(testResult);
        }
        catch(err) {
            returnVal['codeTimeOut']="Code took too long to compile"
        }
    }
    catch (err) {
        returnVal['UnexpectedCode']="Cannot run the code. "
    }
    finally {
        console.log(returnVal)
        return returnVal;
    }
}

module.exports=runCodeInIsolation;