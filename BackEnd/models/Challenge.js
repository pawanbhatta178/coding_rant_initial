const {callDatabase}=require('./callDatabase');

const getChallengeById=async (id)=>{
    const query = {
        text: 'SELECT * from "Challenges" where "id"=$1 ',
        values: [id],
    }
    const {rows}=await callDatabase(query);
    if(rows.length===0){
        return {}
    }     
    return rows[0];
}

const getHintsById = async (id) => {
    const query = {
        text: 'SELECT * from "Hints" where "challengeId"=$1 ',
        values: [id],
    }
    const {rows}=await callDatabase(query);
    if(rows.length===0){
        return [];
    }     
    return rows;
}


const addChallenge=async ({title,questionPrompt,sampleInput,sampleOutput,difficulty})=>{
    const query = {
        text: 'INSERT INTO "Challenges" ("title", "questionPrompt", "sampleInput", "sampleOutput", "difficulty") VALUES ($1, $2, $3, $4, $5) RETURNING *;',
        values: [title, questionPrompt,sampleInput,sampleOutput,difficulty],
    }
   
    const {rows}=await callDatabase(query);
    if(rows.length===0){
        return {}
    }     
    return rows[0];
}

const addChallengeAndHints=async({title,questionPrompt,sampleInput,sampleOutput,difficulty, hints})=>{
    if(!Array.isArray(hints)||hints.length===0){
        return { res: [], error:"Check parameter" }
    }
     const res=await addChallenge({title,questionPrompt,sampleInput,sampleOutput,difficulty});
    if (!res.id){
    return {
        error:"Cannot perform the query"
      }
    }

    const queriesResult= hints.map(async hint=>{
    const query = {
        name:"add-hints",
        text: 'INSERT INTO "Hints" ("challengeId","hintDescription") VALUES ($1, $2) RETURNING *;',
        values: [res.id, hint],
    };
        const { error, rows } = await callDatabase(query);
        if (error) {
            return {
                error,
                rows:rows[0]
            }
        }
        return {
            rows:rows[0]
        }
    })
    const response=await Promise.all(queriesResult)
    response.push(res);
    return response;
}

module.exports = { getChallengeById, addChallenge, addChallengeAndHints, getHintsById}