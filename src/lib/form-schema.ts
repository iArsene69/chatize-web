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

export const MessageSchema = z.object({
  message: z.string().describe("message").max(300, "Nuh-uh only 300 characters bro"),
  type: z.enum(["text", "picture", "video", "document"], {
    required_error: "Select what type of message you want"
  }).default("text"),
  fileUrl: z.string().describe("fileUrl"),
  userId: z.string().describe("userId").uuid({message: "Invalid ID"}),
  roomId: z.string().describe("roomId").uuid({message: "Invalid ID"}),
  willDelete: z.string().describe('willDelete').datetime({
    message: "Invalid time string",
    precision: 1
  })
})
