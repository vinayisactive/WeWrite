import { Hono } from "hono";
import { Bindings } from "../types/interfaces";
import { createBlog, deleteBlog, getBlog, updateBlog, getBlogs } from "../controllers/blog.controllers";

const blogRoutes = new Hono<{ Bindings : Bindings }>(); 

blogRoutes.post("/", createBlog); 
blogRoutes.get("/", getBlogs); 
blogRoutes.get("/:id", getBlog); 
blogRoutes.patch("/:id", updateBlog); 
blogRoutes.delete("/:id", deleteBlog); 

export default blogRoutes; 
