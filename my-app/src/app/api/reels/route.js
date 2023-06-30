import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Reel from "@/models/Reel";

export const GET=async(request)=>{
    try{
        await connect()
        const get=await Reel.find({})
        if(get){
            return new NextResponse(JSON.stringify(get),{status:200});
        }
    }catch(error){
        return new NextResponse("database error",{status:500})
    }
}

export const POST=async(request)=>{
    try{
        await connect();
        const body=await request.json();

        await Reel.create(body);
        return new NextResponse("posted successfully",{status:200})
    }catch(error){
        return new NextResponse(error,{status:500})
    }
}
