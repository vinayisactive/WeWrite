import { Hono } from "hono";
import { Bindings } from "../types/interfaces";
import { singin, signup } from "../controllers/auth.controllers";

const authRoutes = new Hono<{ Bindings: Bindings }>(); 

authRoutes.post("/signup", signup); 
authRoutes.post("/signin", singin); 
 
export default authRoutes; 