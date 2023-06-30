import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Stall from "@/models/Stall";

export const POST=async(request,{params})=>{
    try{
        await connect()
        const {id}=params;
        const {userId,...otherdetails}=await request.json();
        console.log(userId);
    
        const stall=await Stall.findById(id);
        if(stall){
            stall.comments.push({...otherdetails,userId})
            const stallBoost=await stall.save();
            if(stallBoost){
                const stally=await Stall.findById(id).populate('comments.author');

                if(stally){
                    return new NextResponse(JSON.stringify(stally),{status:200});
                }
            }
        }
    }catch(error){
        return new NextResponse(error, { status: 500 });
    }
}