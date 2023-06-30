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