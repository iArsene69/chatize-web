"use client";

import { MessageSchema } from "@/lib/form-schema";
import { useAppState } from "@/lib/providers/app-state-provider";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { ChatInput } from "../global/custom-chat-field";
import { Button } from "../ui/button";

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
      <form className="flex justify-between items-center">
        <FormField 
        control={form.control}
        name="type"
        render={({field}) => (
          <FormItem>
            
          </FormItem>
        )}/>
        <div className="flex-1">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ChatInput
                    className="min-w-[300px]"
                    placeholder="Type a message"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border border-primary"
        >
          Y
        </Button>
      </form>
    </Form>
  );
}
