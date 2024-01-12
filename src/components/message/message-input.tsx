"use client";

import { useAppState } from "@/lib/providers/app-state-provider";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import React, { useLayoutEffect, useRef, useState } from "react";
import { ChatInput } from "../global/custom-chat-field";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import TypeDropdown from "./custom-type-dropdown";

export default function MessageInput() {
  const { state, dispatch } = useAppState();
  const [localUrl, setLocalUrl] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const { toast } = useToast();
  const { user } = useSupabaseUser();
  const nowPlusTwo = new Date(Date.now() + 3600 * 1000 * 24 * 2).toDateString();

  const pressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    onSubmit();
  };

  const onFileInput = (
    type: keyof typeof MessageType,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const maxSize = (size: number): number => {
      const MB = 1024 * 1024;
      return size * MB;
    };

    switch (type) {
      case "text":
        throw new Error("Text only message cannot accept file");
      case "picture":
        const image = event.target.files[0];
        if (
          image.type !== "image/png" &&
          image.type !== "image/jpg" &&
          image.type !== "image/jpeg"
        ) {
          toast({
            title: "File extension incompatible",
            variant: "destructive",
          });
          return;
        }

        if (image.size >= maxSize(5)) {
          toast({
            title: "Image size exceeding 5MB limit",
            variant: "destructive",
          });
          return;
        }
        setLocalUrl(URL.createObjectURL(image));
        setFile(image);
        break;
      case "video":
        const video = event.target.files[0];
        if (video.type !== "video/mp4") {
          toast({
            title: "File extension incompatible",
            variant: "destructive",
          });
          return;
        }
        if (video.size >= maxSize(15)) {
          toast({
            title: "Video size exceeding 15MB limit",
            variant: "destructive",
          });
          return;
        }
        setLocalUrl(URL.createObjectURL(video));
        setFile(video);
        break;
      case "document":
        const document = event.target.files[0];
        if (document.size >= maxSize(50)) {
          toast({
            title: "Document size exceeding 50MB limit",
            variant: "destructive",
          });
          return;
        }
        setLocalUrl(URL.createObjectURL(document));
        setFile(document);
        break;
    }
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
      <TypeDropdown onInputFile={onFileInput} />
      <ChatInput
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
