import { Context } from "hono";
import { createPrismaClient } from "../config/database";
import { userUpdateSchema } from "../types/zod";

const getUser = async(c: Context) => {
    const authUser = c.get('user'); 

    if(!authUser.id){
        return c.json({
            message: "Unauthorized user"
        },409);
    }

    try {
        const { DATABASE_URL } = c.env;
        if (!DATABASE_URL) {
            return c.json({ message: "Server configuration error" }, 500);
        }

        const db = createPrismaClient(DATABASE_URL); 

        const user = await db.user.findUnique({
            where: {
                id: authUser.id
            },
            select: {
                username: true,
                email: true,
                firstName: true,
                lastName: true,
                age: true,
                blogs: true
            }
        }); 

        if(!user){
            return c.json({
                message: "No user found"
            },404);
        }

        return c.json({
            message: "User fetched successfully",
            data: user
        },200);

    } catch (error) {
        console.log(error); 

        return c.json({
            message: "Failed to fetch the user",
            error : error instanceof Error? error.message : "Internal server errro"
        },500)
    }
}; 

const getUserById = async(c: Context) => {
    const userId = c.req.param('id'); 
    if(!userId){
        return c.json({
            message: "User id required"
        },401);
    }

    try {
        const { DATABASE_URL } = c.env;
        if (!DATABASE_URL) {
            return c.json({ message: "Server configuration error" }, 500);
        }

        const db = createPrismaClient(DATABASE_URL);

        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                username: true,
                email: true,
                firstName: true,
                lastName: true,
                age: true,
                blogs: true
            }
        });

        if(!user){
            return c.json({
                message: "User not found"
            },404);
        }

        return c.json({
            message: "User fetched successfully",
            data: user
        },200);

    } catch (error) {
        console.log(error); 

        return c.json({
            message: "Failed to fetch the user",
            error : error instanceof Error? error.message : "Internal server errro"
        },500)
    }
};

const updateUserDetails = async(c: Context) => {
       const user = c.get('user');
       if(!user.id){
        return c.json({
            message: "Unauthorized user"
        },409);
       }

       const body = await c.req.json(); 
    
        const userData = userUpdateSchema.safeParse(body); 
        if(!userData.success){
            return c.json({
                message: "Invalid input data"
            },401);
        }

    try {
        const { DATABASE_URL } = c.env;
        if (!DATABASE_URL) {
            return c.json({ message: "Server configuration error" }, 500);
        }

        const db = createPrismaClient(c.env.DATABASE_URL); 

        const update = await db.user.update({
            where: {
                id: user.id
            },
            data: userData.data,
            select: {
                username: true,
                email: true,
                firstName: true,
                lastName: true,
                age: true
            }
        }); 

        if(!update){
            return c.json({
                message: "Failed to update user"
            },500);
        }

        return c.json({
            message: "User updated successfully",
            data: update
        },200);

    } catch (error) {
        console.log(error); 

        return c.json({
            message: "Failed to fetch the user",
            error : error instanceof Error? error.message : "Internal server errro"
        },500)
    }
}; 

const deleteUser = async(c: Context) => {
    const authUser = c.get('user'); 
    if(!authUser.id){
        return c.json({
            message: "Unauthorized user"
        },409);
    }

    try {
        const { DATABASE_URL } = c.env;
        if (!DATABASE_URL) {
            return c.json({ message: "Server configuration error" }, 500);
        }

        const db = createPrismaClient(DATABASE_URL); 

        const user = await db.user.delete({
            where: {
                id: authUser.id
            }
        }); 

        if(!user){
            return c.json({
                message: "Failed to delete user"
            },500); 
        }

        return c.json({
            message: "User delete successfully",
            data: {
                id: user.id,
                username: user.username, 
                email: user.email
            }
        },200); 
        
    } catch (error) {
        console.log(error); 

        return c.json({
            message: "Failed to fetch the user",
            error : error instanceof Error? error.message : "Internal server errro"
        },500)
    }
};

export {
    getUser,
    getUserById,
    updateUserDetails,
    deleteUser
}; 