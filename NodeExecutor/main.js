require('dotenv').config()
const readFile= require('./readFile');
const runAllTests=require('./runAllTests');
const writeToFile=require("./writeToFile");
const checkEnvVariables=require("./checkEnvVariables");



const main=async ()=>{
  if(!checkEnvVariables()){
    console.log("env variables not set properly");
    return;
  };
  
 readFile(`${process.env.CORRECT_ANSWERS}`,(err,data)=>{
  if(err) return console.log("Server is busy try again later");
  let correctAnswers=JSON.parse(data);

  let testResult=runAllTests(correctAnswers);
  let dataToWrite=JSON.stringify(testResult);

  writeToFile(`${process.env.TEST_RESULT}`,dataToWrite,(err)=>{
    if(err) console.log("Server busy try again later"); 
  })

});
}
main();