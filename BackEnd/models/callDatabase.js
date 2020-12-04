const pool=require('../config/database');


const callDatabase=async (query)=>{
try{
let response=await pool.query(query);
return response;
}
catch(err){
console.log(`Couldn't complete the query ${JSON.stringify(query)} . ERROR: \n`,err);
return {
    error:"Failed to process the  query",
    rows:[]
};
}
}

const callDatabaseTransaction=async (queries)=>{
    if(!Array.isArray(queries)){
        return {}
    }
    await client.query('BEGIN');
    try{
    const client=await pool.connect();
    const multipleRows=[];
    queries.forEach(async query=>{
        const res=await client.query(query);
        multipleRows.push(res.rows);
    })
    await client.query('COMMIT');
    return multipleRows;
    }
    catch(e){
    await client.query('ROLLBACK')
    console.log(e);
    return {
        rows:[]
    };
    }
    finally{
        client.release();
    }
}


module.exports={callDatabase,callDatabaseTransaction};