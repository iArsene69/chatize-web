"use client";

import { MessageSchema } from "@/lib/form-schema";
import { useAppState } from "@/lib/providers/app-state-provider";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { ChatInput } from "../global/custom-chat-field";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export default function MessageInput() {
  const { state, dispatch } = useAppState();
  const { toast } = useToast();
  const { user } = useSupabaseUser();
  const nowPlusTwo = new Date(Date.now() + 3600 * 1000 * 24 * 2).toDateString();
 

  const pressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
    return;
  };

  const onSubmit = () => {
    toast({
      title: "Submited message",
      description: `Your message: ${state.message}`,
    });
    dispatch({
      type: "TYPE_MESSAGE",
      payload: { message: "" },
    });
  };
  return (
    <div className="flex justify-between items-center">
      <ChatInput
        onKeyDown={pressEnter}
        placeholder="Type a message"
        className="min-w-[300px]"
        onInput={(e) =>
          dispatch({
            type: "TYPE_MESSAGE",
            payload: { message: e.currentTarget.textContent || "" },
          })
        }
        value={state.message}
      />
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border border-primary"
        type="button"
        onClick={onSubmit}
      >
        Y
      </Button>
    </div>
  );
}
