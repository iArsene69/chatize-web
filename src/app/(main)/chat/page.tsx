"use client";

import MessageInput from "@/components/message/message-input";
import { useAppState } from "@/lib/providers/app-state-provider";
import React from "react";

export default function ChatPage() {
  const { state } = useAppState();
  return (
    <div>
      <footer className="relative z-20 box-border flex-none order-3 w-full min-h-[62px]">
        <MessageInput />
      </footer>
    </div>
  );
}
