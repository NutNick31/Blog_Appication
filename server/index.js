import express from 'express';

import {connection} from './database/db.js';

import bodyparser from 'body-parser';
import cors from 'cors';

import dotenv from 'dotenv'; 

import router from './routes/route.js';

dotenv.config()

const app=express();
const port =8000;


app.use(cors());
app.use(bodyparser.json({extended:true}));
app.use(bodyparser.urlencoded({ extended:true }));

app.use('/',router)



const password=process.env.DB_PASSWORD;
const username=process.env.DB_USERNAME;

connection(password,username)


app.listen(port,()=>{
    console.log('listening on port '+port);
})