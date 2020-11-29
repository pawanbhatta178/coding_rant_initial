const checkEnvVariables=()=>{
   if(process.env.OUTPUT_LOG&&process.env.USER_CODE&&process.env.CORRECT_ANSWERS&&process.env.TEST_RESULT&&process.env.PERFORMANCE){
     return true;
   }
   else{
       return false;
   }
    
}

module.exports=checkEnvVariables;