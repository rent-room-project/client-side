import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  username: z
    .string({ required_error: "Username is required" })
    .min(1, "Username is required")
    .max(255, "Username is too long"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Email must be a valid email"),
  password: z
    .string({ required_error: "Passwornd is required" })
    .min(5, "Password must have at least 5 characters")
    .max(255, "Password is too long"),
  role: z.string(),
  phoneNumber: z.string().max(255, "Phone Number is too long").optional(),
  address: z.string().max(255, "Address is too long").optional(),
});

export type Author = z.infer<typeof userSchema>;

export const registerSchema = userSchema.omit({ id: true, role: true });

export type RegisterPayload = z.infer<typeof registerSchema>;

export const loginSchema = userSchema.pick({ email: true, password: true });

export type LoginPayload = z.infer<typeof loginSchema>;
