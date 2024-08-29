import { Context } from "hono"
import { createPrismaClient } from "../config/database";
import { signupSchema } from "../types/zod";
import { sign, verify, decode } from "hono/jwt";
import {tokenExp} from "../utilities/timeUtil";

const signup = async(c: Context) => {
    try {
        const db = createPrismaClient(c.env.DATABASE_URL); 
        const body = await c.req.json(); 

        const userData = signupSchema.safeParse(body); 

        if(!userData.success){
            return c.json({
                message: "Invalid input", 
                error : userData.error.errors
            }, 400); 
        }; 

        const {email, username, password} = userData.data; 

        const existingUser = await db.user.findUnique({where: {email}}); 
        if(existingUser){
            return c.json({
                message: "User already exists",
            }, 409); 
        }

        const user = await db.user.create({
            data: {
                email,
                username, 
                password
            }
        }); 

        if(!user){
            return c.json({
                message: "Failed to create user",
            }, 500); 
        }; 

        const token = await sign({ email: user.email, id: user.id, exp: tokenExp }, c.env.JWT_SECRET); 
        if(!token){
            return c.json({
                message: "Failed to create token",
            }, 500); 
        }; 

        return c.json({
            message: "User created successfully",
            data: {
                id: user.id,
                username: user.username
            },
            token: token
        }, 200); 

    } catch (error) {
        return c.json({
            message: "Failed to register user",
            error: error
        }, 500); 
    }
}; 



const singin = async(c: Context) => {
    try {
        const db = createPrismaClient(c.env.DATABASE_URL); 


    } catch (error) {
        
    }
}; 


export {
    signup, 
    singin,
}; 