const pool=require('../config/database');
const callDatabase=require('./callDatabase');
const {v4}=require('uuid');
const getUserIdFromOauthId=async (oauthId)=>{
const query = {
        text: 'SELECT "id" from "Users" where "oauthId"=$1 ',
        values: [oauthId],
}
const {rows}=await callDatabase(query);
if(rows.length===0){
    return false;
}
console.log(rows);
return rows[0].id;
}

const createNewUser=async ({oauthId,displayName})=>{
const query = {
        text: 'INSERT INTO "Users" ("id","displayName","oauthId") VALUES ($1,$2,$3) ',
        values: [v4(),displayName,oauthId], //TODO: make sure if uuid is already taken!
} 
try{
const {rows}=await callDatabase(query);
}
catch(err){
    console.log(err);
}
}

module.exports={getUserIdFromOauthId, createNewUser}