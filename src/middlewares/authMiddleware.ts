import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { currentTime } from "../utilities/timeUtil";

export const authMiddleware = async(c: Context, next: Next) => {
        const authorizationHeader  = c.req.header("authorization"); 
        if(!authorizationHeader){
            return c.json({
                message: "Authorization header is required",
            },401); 
        }

        const token  = authorizationHeader.split(' ')[1]; 
        if(!token){
            return c.json({
                message: "Authorization token is required",
            },401); 
        }

    try {
        const decodedToken = await verify(token, c.env.JWT_SECRET); 
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          return c.json(
            {
              message: "Token has expired",
            },
            401
          );
        }

       c.set("user", {
        id: decodedToken.id,
        email: decodedToken.email
       });

        await next(); 
    } catch (error) {
        console.error('Authentication error:', error);
     
        return c.json(
            {
              message: "Invalid token or authentication error",
            },
            403
          );
        }
}; 