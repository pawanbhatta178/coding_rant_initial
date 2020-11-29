const readFile= require('./readFile');
const runAllTests=require('./runAllTests');
const writeToFile=require("./writeToFile");



const main=async ()=>{
  
 readFile(`./task/correctAnswer.json`,(err,data)=>{
  if(err) return console.log("Cannot read correctAnswer.json");
  console.log("heye");
  let correctAnswers=JSON.parse(data);
  let testResult=runAllTests(correctAnswers);
  let dataToWrite=JSON.stringify(testResult);

  writeToFile('./task/result.json',dataToWrite,(err)=>{
    if(err) console.log("Server busy try again later"); 
  })

});
}
main();