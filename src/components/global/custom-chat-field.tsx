import * as React from "react";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import './custom-chat.css'

export interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLDivElement> {}

const ChatInput = React.forwardRef<HTMLDivElement, ChatInputProps>(
  ({ className, ...props }, ref) => {
    const editableRef = React.useRef<HTMLDivElement>(null);
    const setFocus = () => {
      if (editableRef.current) {
        editableRef.current.focus();
      }
    };
    return (
      <ScrollArea>
        <div
          className={cn(
            "w-full min-h-[20px] box-border border-2 px-8 py-4 mx-1 my-2 bg-white rounded-2xl",
            className
          )}
          ref={ref}
          onClick={setFocus}
        >
          <div className="relative">
            <div
              className="overflow-x-hidden input-div overflow-y-auto whitespace-pre-wrap [word-wrap: break-word] z-[1] max-h-[100px] min-h-[20px] p-[0_0_0_2px] outline-0 transition-[0.2s_padding_ease-in-out]"
              contentEditable
              ref={editableRef}
              {...props}
            ></div>
            <div className="top-0 pointer-events-none placeholder-div [user-select: none] absolute opacity-0 transition-[0.2s_padding_ease-in-out]">
              Type Message
            </div>
          </div>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    );
  }
);
ChatInput.displayName = "ChatInput";

export { ChatInput };
