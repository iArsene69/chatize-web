"use client";

import { MessageSchema } from "@/lib/form-schema";
import { useAppState } from "@/lib/providers/app-state-provider";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useLayoutEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ChatInput } from "../global/custom-chat-field";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import TypeDropdown from "./custom-type-dropdown";

export default function MessageInput() {
  const { state, dispatch } = useAppState();
  const { toast } = useToast();
  const { user } = useSupabaseUser();
  const nowPlusTwo = new Date(Date.now() + 3600 * 1000 * 24 * 2).toDateString();

  const chatRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (chatRef.current) {
      const chatElement = chatRef.current;
      chatElement.focus();
      const range = document.createRange();
      range.selectNodeContents(chatElement);
      range.collapse(false);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [state.message]);

  const pressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    onSubmit();
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
    <div className="flex justify-between px-4 items-center gap-4">
      <TypeDropdown />
      <ChatInput
        ref={chatRef}
        onKeyDown={pressEnter}
        placeholder="Type a message"
        className="flex-1"
        onInput={(e) =>
          dispatch({
            type: "TYPE_MESSAGE",
            payload: { message: e.currentTarget.textContent || "" },
          })
        }
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
