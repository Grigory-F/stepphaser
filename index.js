"use-strict"
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'
import helmet from 'helmet';
dotenv.config();


import fileUpload from 'express-fileupload';
const app = express();
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use(helmet())


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve('static', "input.txt");

import FileRouter from './routes/FileRouter.js'



const PORT = process.env.PORT || 3000;


app.use('/', FileRouter)



app.listen(PORT, () => {
    console.log(`Server worked on ${PORT}\n=====================================================================`);
})