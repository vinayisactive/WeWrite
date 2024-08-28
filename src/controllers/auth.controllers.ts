import { Context } from "hono"
import { createPrismaClient } from "../config/database";

const signup = async(c: Context) => {
    try {
        const db = createPrismaClient(c.env.DATABASE_URL); 
        
    } catch (error) {
        
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