import { Hono } from "hono";
import { ENV } from "../types/env";
import { getUser, getUserById, updateUserDetails } from "../controllers/user.controllers";

const userRoutes = new Hono<{ Bindings : ENV }>(); 

userRoutes.get("/", getUser); 
userRoutes.get("/:id", getUserById); 
userRoutes.patch("/:id", updateUserDetails); 

export default userRoutes; 