const answerKey = require("./task/answerKey.json");
const fs = require('fs');
const {promisify}= require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);


const main = async () => {
    const result = {};
    try {
        const userCode = require("./task/userCode");//making sure the user's code doesnt have syntax errors
        if (typeof userCode != "function") {//making sure if the input code to be checked has a function
            result['functionNotProvidedError'] = "Entry function is not exported";
            return;
        }
        try {
            const tests = await readFile("./task/answerKey.json", 'utf-8');
            const testArray = JSON.parse(tests);
            const runTest = require("./runTest");
            const testResultArray= testArray.map(test => {
                const testOutcome = runTest(test);
                return testOutcome;
            })
            result['testResults'] = testResultArray;
        }
        catch (err) {
            result['syntaxError2'] = err;
        }
    }
    catch (err) {
        result['syntaxError1'] = err;
    }
    finally {
        console.log(result);//write to output file
    }
   
};

main();

