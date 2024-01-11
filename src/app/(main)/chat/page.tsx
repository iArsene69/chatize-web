"use client";

import MessageHeader from "@/components/message/message-header";
import MessageInput from "@/components/message/message-input";
import { useAppState } from "@/lib/providers/app-state-provider";
import React from "react";

export default function ChatPage() {
  const { state } = useAppState();
  return (
    <div>
      <header className="relative z-20 box-border flex-none order-3 w-full min-h-[65px]">
        <MessageHeader selectedRooms={state.selectedRoom} />
      </header>
      <section className="w-full h-full"></section>
      <footer className="relative z-20 box-border flex-none order-3 w-full min-h-[62px]">
        <MessageInput />
      </footer>
    </div>
  );
}
