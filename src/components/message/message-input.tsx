"use client";

import { MessageSchema } from "@/lib/form-schema";
import { useAppState } from "@/lib/providers/app-state-provider";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function MessageInput() {
  const { state } = useAppState();
  const { user } = useSupabaseUser();
  const nowPlusTwo = new Date(Date.now() + 3600 * 1000 * 24 * 2).toDateString();
  const form = useForm<MessageForm>({
    mode: "onChange",
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      fileUrl: "",
      message: "",
      userId: user?.id,
      roomId: state.selectedRoom?.id,
      type: "text",
      willDelete: nowPlusTwo,
    },
  });
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
               <Textarea />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
