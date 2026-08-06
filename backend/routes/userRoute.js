import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { getCurrentUser, profile } from '../controller/userController.js'
import upload from '../middleware/multer.js'
const userRouter = express.Router()

userRouter.get("/getcurrentuser" , isAuth , getCurrentUser);
userRouter.put("/profile" , isAuth ,upload.single("photo"), profile );

export default userRouter