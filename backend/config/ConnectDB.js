import mongoose from 'mongoose'

const connectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/EduFlow`)
        console.log("connected to database")
    } catch (error) {
        console.log(error);
    }
}

export default connectDB