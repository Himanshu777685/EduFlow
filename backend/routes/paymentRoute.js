import express from 'express'
import { RazorpayOrder, verifyPayment } from '../controller/orderController.js';
import isAuth from '../middleware/isAuth.js';

const paymentRouter = express.Router()

paymentRouter.post("/create-order/:courseId", RazorpayOrder);

paymentRouter.post("/verify-payment" , isAuth, verifyPayment)

export default paymentRouter;