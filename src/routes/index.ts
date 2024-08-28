import { Hono } from "hono";
import { ENV } from "../types/env";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import blogRoutes from "./blogRoutes";

const apiV1Router = new Hono<{Bindings: ENV}>(); 

apiV1Router.route("/auth", authRoutes); 
apiV1Router.route("/user", userRoutes); 
apiV1Router.route("/blog", blogRoutes); 

export {
    apiV1Router
}; 

