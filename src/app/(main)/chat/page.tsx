"use client";

import MessageHeader from "@/components/message/message-header";
import MessageInput from "@/components/message/message-input";
import { useAppState } from "@/lib/providers/app-state-provider";
import React from "react";

export default function ChatPage() {
  const { state } = useAppState();
  return (
    <>
      {state.selectedRoom ? (
        <div className="h-screen flex flex-col">
          <header className="relative z-20 box-border order-1 flex-none w-full min-h-[65px]">
            <MessageHeader />
          </header>
          <section className="flex-grow overflow-y-auto order-2"></section>
          <footer className="relative z-20 box-border flex-none order-3 w-full min-h-[62px]">
            <MessageInput />
          </footer>
        </div>
      ) : (
        <div>So anyway</div>
      )}
    </>
  );
}
