import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid Email" }),
  password: z.string().describe("Password").min(1, "Password required"),
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

export const RoomSchema = z.object({
  targetId: z.string().describe("targetId").uuid({ message: "Invalid ID" }),
  creatorId: z.string().describe("creatorId"),
  access: z
    .enum(["PRIVATE", "PUBLIC"], {
      required_error: "You must select privacy access",
    })
    .default("PRIVATE"),
  slug: z.string().describe("slug"),
});
