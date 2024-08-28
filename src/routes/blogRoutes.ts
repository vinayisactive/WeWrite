import { Hono } from "hono";
import { ENV } from "../types/env";
import { createBlog, deleteBlog, getBlog, updateBlog, getBlogs } from "../controllers/blog.controllers";

const blogRoutes = new Hono<{ Bindings : ENV }>(); 

blogRoutes.post("/", createBlog); 
blogRoutes.get("/", getBlogs); 
blogRoutes.get("/:id", getBlog); 
blogRoutes.patch("/:id", updateBlog); 
blogRoutes.delete("/:id", deleteBlog); 

export default blogRoutes; 
