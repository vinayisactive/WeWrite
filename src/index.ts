import { Hono } from 'hono'
import { singinRoute, singupRoute } from './routes/authRoute';
import blogRoutes from './routes/blog';

const app = new Hono()

app.route("api/v1/singup", singupRoute); 
app.route("api/v1/signin", singinRoute); 
app.route("api/v1/blog", blogRoutes)

export default app;
