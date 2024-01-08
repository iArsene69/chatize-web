import * as React from "react";

import { cn } from "@/lib/utils";

export interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLDivElement> {
  placeholder: string;
}

const ChatInput = React.forwardRef<HTMLDivElement, ChatInputProps>(
  ({ className, placeholder, ...props }, ref) => {
    const editableRef = React.useRef<HTMLDivElement>(null);
    const setFocus = () => {
      if (editableRef.current) {
        editableRef.current.focus();
      }
    };
    return (
      <div
        className={cn(
          "w-full ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ring min-h-[20px] border border-input px-4 py-2 mx-1 my-2 bg-background rounded-2xl",
          className
        )}
        ref={editableRef}
        onClick={setFocus}
      >
        <div className="relative">
          <div
            className="overflow-x-hidden input-div overflow-y-auto whitespace-pre-wrap [word-wrap: break-word] z-[1] max-h-[100px] min-h-[20px] p-[0_0_0_2px] outline-0 transition-[0.2s_padding_ease-in-out]"
            contentEditable
            role="textbox"
            ref={ref}
            {...props}
          />
          <div className="top-0 text-muted-foreground pointer-events-none placeholder-div [user-select: none] absolute opacity-0 transition-[0.2s_padding_ease-in-out]">
            {placeholder}
          </div>
        </div>
      </div>
    );
  }
);
ChatInput.displayName = "ChatInput";

export { ChatInput };
