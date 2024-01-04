"use client";

import MessageInput from "@/components/message/message-input";
import { useAppState } from "@/lib/providers/app-state-provider";
import React from "react";

export default function ChatPage() {
  const { state } = useAppState();
  return (
    <div>
      {!state.selectedRoom ? (
        <div>Chat app</div>
      ) : (
        <div>{state.selectedRoom.slug}</div>
      )}
      <div className="absolute bottom-0">
        <MessageInput />
      </div>
    </div>
  );
}
