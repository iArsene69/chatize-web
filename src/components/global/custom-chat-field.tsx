import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("w-[500px] min-h-[20px] box-border px-8 py-4 mx-1 my-2 bg-white rounded-2xl",
      className)}>
        <div className="relative">
          <div className="overflow-x-hidden overflow-y-auto whitespace-pre-wrap [word-wrap: break-word] z-[1] max-h-[100px] min-h-[20px] p-[0_0_0_2px] outline-0 transition-[0.2s_padding_ease-in-out]" contentEditable></div>
          <div></div>
        </div>
      </div>
      //   <textarea
      //     className={cn(
      //       "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      //       className
      //     )}
      //     ref={ref}
      //     {...props}
      //   />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
