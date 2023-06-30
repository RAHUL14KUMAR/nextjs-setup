import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Reel from "@/models/Reel";

export const PUT=async(request,{params})=>{
    // const url = new URL(request.url);
    // const id = url.searchParams.get("id");
    const { id } = params;
    const {userId} = await request.json();

    console.log(userId);
    console.log(id);

    try{
        await connect();
        const post=await Reel.findById(id);
        if (post.like.includes(userId)) {
            await post.updateOne({ $pull: { like: userId } });
            return new NextResponse("Post disliked",{status:200});
        } else {
            await post.updateOne({ $push: { like: userId } });
            return new NextResponse("Post liked",{status:200});
        }
    }catch(error){
        return new NextResponse(error, { status: 500 });
    }
}
