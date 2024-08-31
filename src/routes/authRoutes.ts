import { Hono } from "hono";
import { Bindings } from "../types/interfaces";
import { signin, signup } from "../controllers/auth.controllers";

const authRoutes = new Hono<{ Bindings: Bindings }>(); 

authRoutes.post("/signup", signup); 
authRoutes.post("/signin", signin); 
 
export default authRoutes; 