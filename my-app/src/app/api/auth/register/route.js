import User from '@/models/User';
import connect from '@/utils/db';
import bcrypt from 'bcryptjs';
import {NextResponse} from 'next/server';

export const POST=async(request)=>{
    const {username,email,password,userType,userLocation}=await request.json();

    await connect();
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        userType,
        userLocation
      });

    try{
        await newUser.save();
        return new NextResponse("User has been created", {
            status: 201,
        });
    }catch (err) {
        return new NextResponse(err.message, {
        status: 500,
        });
    }
}