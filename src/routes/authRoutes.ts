import { Hono } from "hono";
import { ENV } from "../types/env";
import { singin, signup } from "../controllers/auth.controllers";

const authRoutes = new Hono(); 

authRoutes.post("/singup", signup); 
authRoutes.post("/singin", singin); 
 
export default authRoutes; 