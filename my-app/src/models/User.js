import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
    },
    profilePhoto:{
        type:String,
    },
    userLocation:{
        type:String,
    },
    youtubeid:{
        type:String,
    },
    instaid:{
        type:String
    }
},{
    timestamps:true
})
export default mongoose.model("User",userSchema);