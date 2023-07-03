import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

import User from '@/models/User';
import connect from '@/utils/db';
import  bcrypt from 'bcryptjs';

const handler=NextAuth({
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",

            async authorize(credentials){
                await connect();
                try{
                    const user=await User.findOne({
                        username:credentials.username
                    })
                    if(user){
                        const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password);
                        if (isPasswordCorrect) {
                            return user;
                        } else {
                            throw new Error("Wrong Credentials!");
                        }
                    }
                }catch (err) {
                throw new Error(err);
                }
            }
        })
    ]
})                                              
export { handler as GET, handler as POST };