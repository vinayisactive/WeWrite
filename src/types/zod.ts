import { string, z } from 'zod'


export const signupSchema = z.object({
    username: z.string().trim(),
    email: z.string().email().trim(),
    password: z.string().min(6).trim()
}); 

export const singinSchema = z.object({
    email: z.string().email().trim(),
    password: string().trim()
}); 

export const blogSchema = z.object({
    title: z.string().min(1).trim(),
    description: z.string().trim(),
    content: z.string().min(1).trim(),
    category: z.enum([
        "AI",
        "TECH",
        "FASHION",
        "HEALTH",
        "EDUCATION",
        "NEWS",
        "FOOD",
      ]),
      published: z.boolean().default(false),
}); 

export const blogUpdateSchema = z.object({
    title: z.string().min(1).trim().optional(),
    description: z.string().trim().optional(),
    content: z.string().min(1).trim().optional(),
    category: z.enum([
        "AI",
        "TECH",
        "FASHION",
        "HEALTH",
        "EDUCATION",
        "NEWS",
        "FOOD",
      ]).optional(),
      published: z.boolean().default(false).optional(),
}); 