import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/ConnectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoute.js';
import cors from 'cors';
import userRouter from './routes/userRoute.js';

dotenv.config()

const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

const port = process.env.PORT;

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true

}))

app.use("/api/auth" , authRouter);
app.use("/api/user" , userRouter);

app.get('/', (req, res)=>{
    res.send("hello from server");
})

app.listen(port , ()=>{
    console.log("server is running on port" , port)
});

