import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("Email is required")
        .email("Please enter a valid email"),
    password: z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z
    .object({
        email: z
            .string()
            .trim()
            .nonempty("Email is required")
            .email("Please enter a valid email"),
        username: z.string().trim().nonempty("Username is required"),
        password: z
            .string()
            .trim()
            .min(6, "Password must be at least 6 charcters"),
        confirm_password: z.string().trim(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "confirm password does not match the entered password",
        path: ["confirm_password"],
    });

export const subscriptionSchema = z.object({
    subscription_name: z
        .string()
        .trim()
        .nonempty("Subscription name is required"),
    amount: z
        .number()
        .gte(1.0, "Amount must be equal to or greater than 1.00"),
    billing_frequency: z.enum(["monthly", "yearly", "quarterly"]),
    billing_date: z.string().trim().nonempty("Please select a billing date"),
});
