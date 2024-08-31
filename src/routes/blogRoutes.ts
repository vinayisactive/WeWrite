import { Hono } from "hono";
import { Bindings } from "../types/interfaces";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createBlog, deleteBlog, getBlog, updateBlog, getBlogs, getUserBlogs } from "../controllers/blog.controllers";

const blogRoutes = new Hono<{ Bindings : Bindings }>(); 

blogRoutes.post("/", authMiddleware, createBlog); 
blogRoutes.get("/", getBlogs); 
blogRoutes.get("/:id", getBlog); 
blogRoutes.get("/user/blogs", authMiddleware, getUserBlogs); 
blogRoutes.patch("/:id", authMiddleware, updateBlog); 
blogRoutes.delete("/:id", authMiddleware, deleteBlog); 

export default blogRoutes; 
