"use client";

import { EmojiClickData, Theme, EmojiStyle } from "emoji-picker-react";
import dynamic from "next/dynamic";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SmileIcon } from "lucide-react";
import { useTheme } from "next-themes";

type EmojiPickerProps = {
  getValue: (emoji: string) => void;
};

export default function EmojiPicker({ getValue }: EmojiPickerProps) {
  const { theme } = useTheme();
  const Picker = dynamic(() => import("emoji-picker-react"));
  const onClick = (selectedEmoji: EmojiClickData, e: MouseEvent) => {
    e.preventDefault();
    getValue(selectedEmoji.emoji);
  };

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <SmileIcon className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-muted-foreground/60" />
        </PopoverTrigger>
        <PopoverContent className="bg-transparent border-none">
          <Picker
            onEmojiClick={onClick}
            theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
            emojiStyle={EmojiStyle.GOOGLE}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
