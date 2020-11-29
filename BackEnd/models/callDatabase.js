const pool=require('../config/database');


const callDatabase=async (query)=>{
try{
let response=await pool.query(query);
return response;
}
catch(err){
console.log(`Couldn't complete the query ${JSON.stringify(query)} . ERROR: \n`,err);
return {
    rows:[]
};
}

}

module.exports=callDatabase;