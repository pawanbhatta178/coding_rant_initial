const pool=require('../config/database');
const callDatabase=require('./callDatabase');
const {v4}=require('uuid');
const getUserIdFromOauthId=async (oauthId)=>{
const query = {
        text: 'SELECT "id" from "Users" where "oauthId"=$1 ',
        values: [oauthId],
}
try{
const {rows}=await callDatabase(query);
if(rows.length===0){
    return false;
}
console.log(rows);
return rows[0].id;
}
catch(err){
    console.log(err);
    return false;
}
}

const createNewUser=async ({oauthId,displayName})=>{
const query = {
        text: 'INSERT INTO "Users" ("id","displayName","oauthId") VALUES ($1,$2,$3) RETURNING "id" ',
        values: [v4(),displayName,oauthId], 
} 
try{
const {rows}=await callDatabase(query);
if(rows.length===0){
    return false;
}
return rows[0].id;
}
catch(err){
    console.log(err);
    return false;
}
}


const getUserDetailsFromId=async (id)=>{
    const query = {
            text: 'SELECT * from "Users" where "id"=$1  ',
            values: [id], 
    } 
    try{
    const {rows}=await callDatabase(query);
    if(rows.length===0){
        return false;
    }
    return rows[0];
    }
    catch(err){
        console.log(err);
        return false;
    }
}


module.exports={getUserIdFromOauthId, createNewUser, getUserDetailsFromId}