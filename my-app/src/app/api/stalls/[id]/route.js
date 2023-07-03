import { NextResponse } from "next/server";
import connect from '@/utils/db';
import Stall from '@/models/Stall';

export const PUT=async(request,{params})=>{
    try{
        await connect();
        const {id}=params;
        const {userId,...otherDetails}=await request.json();

        const post=await Stall.findById(id)
        if(post.postedBy==userId){
            await post.updateOne({$set:otherDetails});
            return new NextResponse("updated successfully",{status:200})
        }else{
            return new NextResponse("you are not the correct user",{status:403})
        }

    }catch(error){
        return new NextResponse(error,{status:500})
    }
}

export const GET=async(request,{params})=>{
    try{
        await connect();
        const {id}=params;
        const stall=await Stall.findById(id).populate('comments.author');

        if(stall){
            return new NextResponse(JSON.stringify(stall),{status:200});
        }
    }catch(error){
        return new NextResponse(error,{status:500})
    }
}