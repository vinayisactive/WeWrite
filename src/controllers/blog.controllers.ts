import { Context } from "hono";
import { createPrismaClient } from "../config/database";

const createBlog = async(c: Context) => {
    try {
        const db = createPrismaClient(c.env.DATABASE_URL); 

    } catch (error) {
        
    }
};

const getBlogs = async(c: Context) => {
    try {
        const db = createPrismaClient(c.env.DATABASE_URL); 

        return new Response(c.env.DATABASE_URL); 

        
    } catch (error) {
        
    }
}; 

const getBlog = async(c: Context) => {
    try {
        const db = createPrismaClient(c.env.DATABASE_URL); 

    } catch (error) {
        
    }
};

const updateBlog = async(c: Context) => {
    try {
        const db = createPrismaClient(c.env.DATABASE_URL); 

    } catch (error) {
        
    }
};

const deleteBlog = async(c: Context) => {
    try {
        const db = createPrismaClient(c.env.DATABASE_URL); 

        

    } catch (error) {
        
    }
}; 

export {
    createBlog,
    getBlogs,
    getBlog, 
    updateBlog,
    deleteBlog
};

