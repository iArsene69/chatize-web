import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { getRoomAndUsers } from "@/lib/severActions/server-queries";
import { useAppState } from "@/lib/providers/app-state-provider";
import { getRoomName } from "@/lib/utils";

type RoomsProps = {
  rooms: RoomMember;
  roomName: string;
};

export default function Rooms({ rooms, roomName }: RoomsProps) {
  const { dispatch } = useAppState();

  const selectRoom = (roomId: string) => {
    dispatch({
      type: "SELECT_ROOM",
      payload: roomId,
    });
  };

  return (
    <div
      onClick={() => selectRoom(rooms.id)}
      className="flex justify-between gap-4 cursor-pointer items-center"
    >
      <Avatar className="flex-shrink-0">
        <AvatarImage src="" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <div className="flex-auto">
        <div className="flex flex-col gap-2">
          <div className="w-[100px] truncate">{roomName}</div>
          <small className="w-[180px] truncate">Message</small>
          <Separator orientation="horizontal" />
        </div>
      </div>
    </div>
  );
}
