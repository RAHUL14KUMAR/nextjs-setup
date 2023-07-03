import { NextResponse } from "next/server"
import connect from "@/utils/db";
import Stall from "@/models/Stall"

export const GET=async (request) =>{
    try{
        await connect();
        const get=await Stall.find({}).populate('comments.author')
        if(get){
            return new NextResponse(JSON.stringify(get),{status:200})
        }
    }catch(error){
        return new NextResponse(error,{status:500})
    }
}
export const POST=async(request)=>{
    try{
        await connect();
        const body=await request.json();
        await Stall.create(body);
        return new NextResponse("stall created",{status:200});
    }catch(error){
        return new NextResponse(error,{status:500})
    }
}
