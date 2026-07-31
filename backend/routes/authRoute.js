import express from 'express'
import { forget_password, googleAuth, login, logout, reset_password, signup } from '../controller/authController.js'


const authRouter = express.Router();

authRouter.post("/signup" , signup);
authRouter.post("/login" , login);
authRouter.get("/logout" , logout);
authRouter.post("/forget-password" , forget_password)
authRouter.post("/reset-password/:token" , reset_password)
authRouter.post("/googleAuth" , googleAuth)

export default authRouter