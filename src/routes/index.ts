import { Hono } from "hono";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import blogRoutes from "./blogRoutes";
import { Bindings } from "../types/interfaces";

const apiV1Router = new Hono<{ Bindings: Bindings }>(); 

apiV1Router.route("/auth", authRoutes);
apiV1Router.route("/user", userRoutes); 
apiV1Router.route("/blog", blogRoutes); 

export {
    apiV1Router
}; 

