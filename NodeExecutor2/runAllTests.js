const test1=require('./task/userCode');
const _=require('lodash');
const runAllTests=(o)=>{
    if(typeof o!=="object"){
        return;
    }
    let finalTestResult=[];
    o.forEach((answer)=>{
    const {id, input,expectedOutput}=answer;
    let actualOut;
    const output={
        id,
        passed:false,
        actualOut,
        expectedOutput
    }
    

    if(Array.isArray(input)){//multiple args
        output.actualOut=test1.apply(null,input);
        output.passed=_.isEqual(expectedOutput,output.actualOut)
    }

    else{//single argument
        let arg=input;
        if(typeof input ==="object"){
         arg= JSON.parse(input);
        }
       output.actualOut=test1(arg);
       output.passed=_.isEqual(expectedOutput,output.actualOut);
    }

     finalTestResult.push(output);
})
    return finalTestResult;
}


module.exports=runAllTests;