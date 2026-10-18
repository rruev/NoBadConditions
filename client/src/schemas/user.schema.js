import * as zod from "zod";

export const registerSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    confirmPassword: zod.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

