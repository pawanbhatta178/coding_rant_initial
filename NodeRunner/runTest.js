const { TASKPATH} =require("./constants")
const userCode = require(`./${TASKPATH}/userCode`);
const isEqual = require("lodash.isequal");
const Timer=require("./Timer");


const runFunctionWithAnalysis = (param) => {
    const timer = new Timer();
    timer.startTimer();
    const returnVal = userCode.apply(null, param);//running user's code in timed environment
    timer.stopTimer();
    const timeTaken = timer.getTotalTimeTaken();
    return {
        returnVal,
        timeTaken
    }
}

const runFunctionForSingleArg = (param) => {
    const timer = new Timer();
    timer.startTimer();
    const returnVal = userCode(param);//running user's code in timed environment
    timer.stopTimer();
    const timeTaken = timer.getTotalTimeTaken();
    return {
        returnVal,
        timeTaken
    }
}


const runTest = (a) => {
    let testOutcome = {...a};
    if((Array.isArray(a.input))&&(a.argSize>1)){//multiple args
       const {returnVal,timeTaken}  = runFunctionWithAnalysis(a.input);
        testOutcome = { ...a, returnVal, timeTaken };
    }
    else if (Array.isArray(a.input)) {
        singleArrayArg = a.input;
        const { returnVal, timeTaken } = runFunctionForSingleArg(singleArrayArg);
        testOutcome = { ...a, returnVal, timeTaken };
    }
    else {//single argument present, therefore making it an array before using apply method
        singleArg = [a.input];
        const { returnVal, timeTaken } = runFunctionWithAnalysis(singleArg);
        testOutcome = { ...a, returnVal, timeTaken };
    }

    testOutcome['passed'] = isEqual(testOutcome.expectedOutput,testOutcome.returnVal);
    return testOutcome;
}


module.exports = runTest;

