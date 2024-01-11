"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageCircle, Settings } from "lucide-react";
import CustomTooltip from "../global/custom-tooltip";
import { SheetHeader } from "../ui/sheet";
import RoomCreator from "../global/room-creator";

type UserbarProps = {
  userId: string;
};

export default function Userbar({ userId }: UserbarProps) {
  return (
    <div className="flex justify-between items-center w-full h-full bg-primary p-4">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <div className="flex justify-evenly gap-4">
        <CustomTooltip
          trigger={<MessageCircle className="text-white" />}
          content={<p>New chat</p>}
        >
          <SheetHeader className="text-2xl">New chat</SheetHeader>
          <RoomCreator />
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
