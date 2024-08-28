import { Context } from "hono";
import { createPrismaClient } from "../config/database";

const getUser = async(c: Context) => {
    try {
        const db = createPrismaClient(c.env.DATABASE_URL);


    } catch (error) {
        
    }
};

const getUserById = async(c: Context) => {
    try {
        const db = createPrismaClient(c.env.DATABASE_URL); 


    } catch (error) {
        
    }
}; 

const updateUserDetails = async(c: Context) => {
    try {
        const db = createPrismaClient(c.env.DATABASE_URL); 


    } catch (error) {
        
    }
}; 



export {
    getUser,
    getUserById,
    updateUserDetails
}; 