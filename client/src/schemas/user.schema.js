import * as zod from "zod";

export const registerSchema = zod.object({
    email: zod.email(),
    password: zod.string().min(3 , "Password must be at least 3 characters"),
})
