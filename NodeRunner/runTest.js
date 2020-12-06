const userCode = require("./task/userCode");
const _ = require("lodash");



const runTest = (a) => {
    const testOutcome = {...a};
    if(Array.isArray(a.input)){//multiple args
        testOutcome['returnVal']=userCode.apply(null,a.input);
    }
    else {//single argument present, therefore making it an array before using apply method
        singleArg = [a.input];
        testOutcome['returnVal']=userCode.apply(null,singleArg);
    }

    testOutcome['passed'] = _.isEqual(testOutcome.expectedOutput,testOutcome.returnVal);
    return testOutcome;
}


module.exports = runTest;

