import User from '@/models/User';
import connect from '@/utils/db';
import bcrypt from 'bcryptjs';
import {NextResponse} from 'next/server';

export const POST=async(request)=>{
    const {username,password}=await request.json();
    try{
        await connect();
        const user=await User.findOne({username});
        
        if(user){
            const validation=await bcrypt.compare(password,user.password);
            if(!validation){
                return new NextResponse("wrong password credentials",{
                    status: 400,
                });
            }else{
                return new NextResponse(JSON.stringify(user),{status:200});
            }
        }
    }catch (err) {
        return new NextResponse(err.message, {
        status: 500,
        });
    }
}