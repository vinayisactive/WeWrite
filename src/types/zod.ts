import { string, z } from 'zod'

export const signupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
}); 

export const singinSchema = z.object({
    email: z.string().email(),
    password: string()
}); 