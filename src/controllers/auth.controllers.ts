import { Context } from "hono"
import { createPrismaClient } from "../config/database";
import { signupSchema, singinSchema } from "../types/zod";
import { sign, verify, decode } from "hono/jwt";
import bcryptjs from 'bcryptjs'
import { setCookie } from "hono/cookie";

const signup = async(c: Context) => {
    const body = await c.req.json(); 
    try {
        const { DATABASE_URL, JWT_SECRET } = c.env;
        if (!DATABASE_URL || !JWT_SECRET) {
            return c.json({ message: "Server configuration error" }, 500);
        }

        const db = createPrismaClient(DATABASE_URL); 
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

        const hashedPassword = await bcryptjs.hash(password,12); 

        const user = await db.user.create({
            data: {
                email,
                username, 
                password: hashedPassword
            }
        }); 

        if(!user){
            return c.json({
                message: "Failed to create user",
            }, 500); 
        }; 

        const oneMonthInSeconds : number = 30 * 24 * 60 * 60;
        const currentTime : number = Math.floor(Date.now() / 1000);
        const tokenExp : number =  currentTime + oneMonthInSeconds; 

        const token = await sign({ email: user.email, id: user.id, exp: tokenExp }, JWT_SECRET); 
        if(!token){
            return c.json({
                message: "Failed to create token",
            }, 500); 
        }; 

        return c.json({
            message: "User created successfully",
            data: {
                id: user.id,
                username: user.username,
                token: token
            },
        }, 200); 

    
    } catch (error) {
        console.log(error); 

        return c.json({
            message: "Failed to signup user",
            error: error instanceof Error ? error.message : "Internal server error",
        },500);
    }
}; 

const signin = async(c: Context) => {
    const body = await c.req.json(); 

    try {
        const { DATABASE_URL, JWT_SECRET } = c.env;
        if (!DATABASE_URL || !JWT_SECRET) {
            return c.json({ message: "Server configuration error" }, 500);
        }

        const db = createPrismaClient(DATABASE_URL); 

        const userData = singinSchema.safeParse(body); 
        if(!userData.success){
            return c.json({
                message: "Invalid input values",
                error : userData.error.flatten()
            },400); 
        }

        const user = await db.user.findUnique({
            where: {
                email: userData.data?.email
            }
        }); 
        
        if(!user){
            return c.json({ message: "No user exists"}, 404); 
        }; 

        const isPasswordCorrect = await bcryptjs.compare(userData.data.password, user?.password); 
        if(!isPasswordCorrect){
            return c.json({ message: "Incorrect password" },401); 
        }

        const oneMonthInSeconds : number = 30 * 24 * 60 * 60;
        const currentTime : number = Math.floor(Date.now() / 1000);
        const tokenExp : number =  currentTime + oneMonthInSeconds; 

        const token = await sign({ email: user.email, id: user.id, exp: tokenExp }, JWT_SECRET); 
        if(!token){
            c.json({ message: "Failed to create token" }, 500);
        }

        setCookie(c, "token", token, {
            secure: true, 
            httpOnly: true, 
            sameSite: 'none',
            expires:  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }); 

        return c.json({
            message: "User signin successfully",
            data : {
                id: user.id,
                username: user.username,
                email: user.email,
                token: token
            }
        },200);

    } catch (error) {
        console.log(error);
        
            return c.json({
                message: "Failed to signin user",
                error: error instanceof Error ? error.message : "Internal server error",
            },500);
    }
}; 

export {
    signup, 
    signin,
}; 