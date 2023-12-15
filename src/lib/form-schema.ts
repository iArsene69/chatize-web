import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid Email" }),
  password: z
    .string()
    .describe("Password")
    .min(1, "Password required"),
});

export const SignUpFormSchema = z
  .object({
    email: z.string().describe("Email").email({ message: "Invalid Email" }),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must contain atleast 6 characters long"),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(6, "Password must contain atleast 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password didn't match",
    path: ["confirmPassword"],
  });
