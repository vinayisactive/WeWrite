import { Hono } from 'hono'
import { apiV1Router } from './routes';
import { Bindings } from './types/interfaces';

const app = new Hono<{Bindings: Bindings}>()

app.route("/api/v1", apiV1Router); 

export default app;
