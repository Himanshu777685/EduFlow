import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/userModel.js"


export const getCurrentUser = async(req , res) =>{
    try {
        const user = await User.findById(req.userId).select("-password")

        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json({user})
    } catch (error) {
     return res.status(500).json({message : `GetCurrentUser error ${error}`})   
    }
}

export const profile = async(req , res) =>{
    try {
        const userId = req.userId;

        const {name , description}= req.body;

        if(!userId){
            return res.status(404).json({success : false ,  message : "user not found"});
        }

        const updateData = {name , description}
        
        let photoUrl;
        
        if(req.file){
            photoUrl = await uploadOnCloudinary(req.file.path);
            
            updateData.avatar = photoUrl;
        }
        
        const user = await User.findByIdAndUpdate(userId , updateData , { new:true});
        
        return res.status(200).json({success : true , user});

        
    } catch (error) {
        return res.status(500).json({message : `Profile error ${error}`})  
    }


}