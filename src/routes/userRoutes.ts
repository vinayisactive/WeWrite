import { Hono } from "hono";
import { Bindings } from "../types/interfaces";
import { getUser, getUserById, updateUserDetails } from "../controllers/user.controllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRoutes = new Hono<{ Bindings : Bindings }>(); 

userRoutes.get("/", authMiddleware, getUser); 
userRoutes.get("/:id", getUserById); 
userRoutes.patch("/:id", authMiddleware, updateUserDetails); 

export default userRoutes; 