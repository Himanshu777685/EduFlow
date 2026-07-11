import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/ConnectDB.js';
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express();
app.use(express.json());
app.use(cookieParser);

connectDB();

const port = process.env.PORT;

app.get('/', (req, res)=>{
    res.send("hello from server");
})

app.listen(port , ()=>{
    console.log("server is running on port" , port)
});