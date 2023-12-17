import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageCircle, Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import CustomTooltip from "./custom-tooltip";
import { SheetHeader } from "../ui/sheet";

type UserbarProps = {
  userId: string;
};

export default function Userbar({ userId }: UserbarProps) {
  return (
    <div className="flex justify-between items-center w-full h-full bg-muted-foreground p-4">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <div className="flex justify-evenly gap-4">
        <CustomTooltip
          trigger={<MessageCircle className="text-white" />}
          content={<p>New chat</p>}
        >
          <SheetHeader>New chat</SheetHeader>
        </CustomTooltip>
        <CustomTooltip
          trigger={<Settings className="text-white" />}
          content={<p>Settings</p>}
        >
          Hello
        </CustomTooltip>
      </div>
    </div>
  );
}
