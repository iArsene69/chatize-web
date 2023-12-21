import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { getRoomAndUsers } from "@/lib/severActions/server-queries";

type RoomsProps = {
  rooms: Rooms;
  userId: string
};

export default async function Rooms({ rooms, userId }: RoomsProps) {
  const {data, error} = await getRoomAndUsers(rooms.id)

  if(!data && error) throw new Error(error)

  const name = data.map(r => {
    switch (r.rooms.access) {
      case "PRIVATE":
        const roomName = data.filter(r => r.user.id !== userId)
        return roomName.map(u => {
          return u.user.email
        })
      case "PUBLIC":
        return r.rooms.slug
    }
  }) as unknown as string

  return (
    <div className="flex justify-between gap-4 items-center">
      <Avatar className="flex-shrink-0">
        <AvatarImage src="" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <div className="flex-auto">
        <div className="flex flex-col gap-2">
          <div className="w-[100px] truncate">{name[0]}</div>
          <small className="w-[180px] truncate">Message</small>
          <Separator orientation="horizontal" />
        </div>
      </div>
    </div>
  );
}
