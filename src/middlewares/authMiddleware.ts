import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";

export const authMiddleware = async(c: Context, next: Next) => {
        const token = getCookie(c, 'token')

        if(!token){
            return c.json({
                message: "Authorization header is required",
            },401); 
        }

        const currentTime : number = Math.floor(Date.now() / 1000);
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
              error: error instanceof Error ? error.message : "Internal server error",
            },
            403
          );
        }
}; 