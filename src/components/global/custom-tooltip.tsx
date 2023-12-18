import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

type CustomTooltipProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  children?: React.ReactNode;
};

export default function CustomTooltip({
  trigger,
  content,
  children,
}: CustomTooltipProps) {
  return (
    <TooltipProvider>
      <Sheet>
        <Tooltip>
          <SheetTrigger asChild>
            <TooltipTrigger>{trigger}</TooltipTrigger>
          </SheetTrigger>
          <TooltipContent>{content}</TooltipContent>
        </Tooltip>
        <SheetContent side="left" className="w-[300px]">{children}</SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}
