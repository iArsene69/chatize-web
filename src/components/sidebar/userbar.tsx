import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";

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
        <Settings className="text-white" />
    </div>
  );
}
