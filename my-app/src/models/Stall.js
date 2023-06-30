// import mongoose from 'mongoose'
import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema=new Schema({
    comment:{
        type:String,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
        timestamps:true
});
const stallSchema=new Schema({
    stallname:{
        type:String,
        required:true
    },
    food:[String],
    location:{
        type:String,
    },
    image:{
        type:String,
        required:true
    },
    review:{
        type:String
    },
    postedBy:{
        type:String
    },
    comments:[commentSchema]
},{
    timesstamps:true
})
export default mongoose.model("Stall",stallSchema);