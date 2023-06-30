// import mongoose from 'mongoose'
import mongoose from "mongoose";
const { Schema } = mongoose;

const reelSchema=new Schema({
    video:{
        type:String,
    },
    caption:{
        type:String
    },
    location:{
        type:String,
    },
    like:[]
},{
    timestamps:true
});

export default mongoose.model("Reel",reelSchema);