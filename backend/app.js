const express = require('express');
const cors = require('cors');
const {open} = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

const app=express();
app.use(cors());
app.use(express.json());

const dbPath=path.join(__dirname,'jokes.db');

let db=null;
const initializeDBAndServer=async()=>{
    try{
        db=await open({
            filename:dbPath,
            driver:sqlite3.Database,
        });
        app.listen(3000,async()=>{
            console.log('Server is running on port 3000');
            const jokes=await getJokes();
            console.log(jokes);
        });
    }catch(e){
        console.log(`DB Error ${e.message}`);
    }
};

initializeDBAndServer();

const getJokes=async()=>{
    const getDBQuery=`SELECT * FROM jokes where setup is not null and delivery is not null limit 10`;
    const jokes= await db.all(getDBQuery);
    return jokes;
}