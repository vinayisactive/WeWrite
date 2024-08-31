import { Context } from "hono";
import { createPrismaClient } from "../config/database";
import { blogSchema, blogUpdateSchema } from "../types/zod";

const createBlog = async(c: Context) => {
    const body = await c.req.json();  
    const user = c.get("user"); 

    if(!user.id){
      return  c.json({ message: "Unauthorized request"} ,500);
    }

    try {
        const { DATABASE_URL } = c.env;
        if (!DATABASE_URL) {
            return c.json({ message: "Server configuration error" }, 500);
        }

        const db = createPrismaClient(DATABASE_URL);

        const blogData = blogSchema.safeParse(body); 
        if(!blogData.success){
            return c.json({
                message: "Invalid input data",
                error: blogData.error.flatten()
            },403); 
        }

        const {title, description, content, category, published} = blogData.data
     
        const blog = await db.blog.create({
            data: {
                title,
                description, 
                content, 
                category, 
                authorId : user.id, 
                published
            }
        }); 

        if(!blog){
            return c.json({ message: "Failed to post blog"} ,500); 
        }

        return c.json({
            message: "Blog posted successfully",
            data: blog,
        },200);
    } catch (error) {

        return c.json({
            message: "Failed to post blog", 
            error: error instanceof Error ? error.message : "Internal server error",
        })
    }
};

const getBlogs = async(c: Context) => {
    try {
        const { DATABASE_URL } = c.env;
        if (!DATABASE_URL) {
            return c.json({ message: "Server configuration error" }, 500);
        }
        
        const db = createPrismaClient(c.env.DATABASE_URL); 

        const blogs = await db.blog.findMany({
            where: {
                published: true
            }
        }); 

        if(!blogs){
            return c.json({
                message: "No published blogs found"
            },200); 
        }

        return c.json({
            message: "Blogs fetched successfully",
            data: {
                total: blogs?.length,
                blogs
            }
        },200); 
    } catch (error) {
        console.log(error)

        return c.json({
            message : "Failed to fetch blogs",
            error: error instanceof Error? error.message : "Internal server error"
        },500);
    }
}; 

const getBlog = async(c: Context) => {
    const blogId = c.req.param('id');
 
    if(!blogId){
        return c.json({ message: "Blog Id required"}, 401); 
    }

    try {
        const { DATABASE_URL } = c.env;
        if (!DATABASE_URL) {
            return c.json({ message: "Server configuration error" }, 500);
        }

        const db = createPrismaClient(c.env.DATABASE_URL); 

        const blog = await db.blog.findUnique({
            where: {
                id: blogId
            }
        }); 

        if(!blog){
            return c.json({message: "No blog found"}, 404); 
        }

        return c.json({
            message: "Blog fetched successfully",
            blog
        },200); 

    } catch (error) {
        console.log(error)

        return c.json({
            message: "Failed to fetch blog",
            error: error instanceof Error? error.message: "Internal server error"
        },500);
    }
};

const getUserBlogs = async(c: Context) => {
    const user = c.get('user'); 
    if(!user.id){
        return c.json({
            message: "User not authorized",
        },500);
    }

    try {
        const { DATABASE_URL } = c.env;
        if (!DATABASE_URL) {
            return c.json({ message: "Server configuration error" }, 500);
        }

        const db = createPrismaClient(DATABASE_URL);

        const blogs = await db.blog.findMany({
           where: {
            authorId: user.id
           },
        }); 

        if(!blogs){
            return c.json({
                message: "blogs found."
            },404)
        }

        return c.json({
            message: "Blogs fetched successfully",
            data: {
                total: blogs?.length,
                blogs
            }
        },200); 
        

    } catch (error) {
        console.log(error); 

        return c.json({
            message: "Failed to user blogs",
            error: error instanceof Error? error.message : "Internal server error"
        },500)
    }

}

const updateBlog = async(c: Context) => {
    const body = await c.req.json(); 
    const user = c.get('user'); 
    const blogId = c.req.param('id');

    if(!blogId){
        return c.json({
            message: "Blog id isn't required"
        },401); 
    }

    if(!user.id){
        return c.json({
            message: "Unauhorized user"
        },500); 
    }

    const blogData = blogUpdateSchema.safeParse(body); 
    if(!blogData.success){
        return c.json({
            message: "Invalid input data",
            error: blogData.error.flatten()
        },409)
    }

    try {
        const { DATABASE_URL } = c.env;
        if (!DATABASE_URL) {
            return c.json({ message: "Server configuration error" }, 500);
        }

        const db = createPrismaClient(c.env.DATABASE_URL);  

        const update = await db.blog.update({
            where: {
                id: blogId,
                authorId: user.id
            },
            data: blogData.data
        }); 

        if(!update){
            return c.json({
                message: "Failed to update blog"
            },500); 
        }

        return c.json({
            message: "Blog updated successfully",
            data: update
        },200);

    } catch (error) {
        console.log(error)

        return c.json({
            message: "Failed to delete blog",
            error: error instanceof Error? error.message : "Internal server error"
        },500)
    }
};

const deleteBlog = async(c: Context) => {
    const blogId = c.req.param('id'); 
    if(!blogId){
        return c.json({ message: "Blog id required" },401); 
    }

    const user = c.get('user'); 
    if(!user.id){
        return c.json({ message: "Unauthorized user" },409); 
    }

    try {
        const { DATABASE_URL } = c.env;
        if (!DATABASE_URL) {
            return c.json({ message: "Server configuration error" }, 500);
        }

        const db = createPrismaClient(c.env.DATABASE_URL); 

        const blog = await db.blog.delete({
            where: {
                id: blogId,
                authorId : user.id
            }
        }); 

        if(!blog){
            return c.json({
                message: "Either blog doesn't exists or Failed to delete blog"
            },500); 
        }

        return c.json({
            message: "Blog deleted successfully",
            delete_data: {
                title: blog.title,
                createdAt: blog.createdAt
            }
        },200); 

    } catch (error) {
        console.log(error)

        return c.json({
            message: "Failed to delete blog",
            error: error instanceof Error? error.message : "Internal server error"
        },500)
    }
}; 

export {
    createBlog,
    getBlogs,
    getBlog, 
    getUserBlogs,
    updateBlog,
    deleteBlog
};

