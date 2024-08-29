import { Hono } from "hono";
import { Bindings } from "../types/interfaces";
import { getUser, getUserById, updateUserDetails } from "../controllers/user.controllers";

const userRoutes = new Hono<{ Bindings : Bindings }>(); 

userRoutes.get("/", getUser); 
userRoutes.get("/:id", getUserById); 
userRoutes.patch("/:id", updateUserDetails); 

export default userRoutes; 