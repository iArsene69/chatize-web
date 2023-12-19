"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormSchema } from "@/lib/form-schema";
import { actionLogin } from "@/lib/severActions/auth-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const form = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
    const { error } = await actionLogin(formData);
    if (error) {
      form.reset();
      setSubmitError(error.message);
    }
    router.replace("/chat");
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center flex gap-4 sm:w-[400px] flex-col"
      >
        <FormDescription>Login bro</FormDescription>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          type="submit"
          className="w-full p-6"
          size={"lg"}
          disabled={isLoading}
        >
          {!isLoading ? "Login" : "Loading..."}
        </Button>
        <span className="self-center">
          Don&apos;t have account yet?{" "}
          <Link className="text-primary" href={"/signup"}>
            Sign up
          </Link>
        </span>
      </form>
    </Form>
  );
}
