import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

type RoomsProps = {
  rooms: string;
};

export default function Rooms({ rooms }: RoomsProps) {
  return (
    <div className="flex justify-between gap-4 items-center">
      <Avatar className="flex-shrink-0">
        <AvatarImage src="" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <div className="flex-auto">
        <div className="felx flex-col gap-2">
          <div>Name</div>
          <div className="text-xs">Message</div>
          <Separator orientation="horizontal" />
        </div>
      </div>
    </div>
  );
}
