import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { getRoomAndUsers } from "@/lib/severActions/server-queries";
import { useAppState } from "@/lib/providers/app-state-provider";

type RoomsProps = {
  rooms: Rooms;
  userId: string;
};

export default function Rooms({ rooms, userId }: RoomsProps) {
  const { state, dispatch } = useAppState();
  const [name, setName] = useState("");

  useEffect(() => {
    const getName = async (roomId: string) => {
      const { data, error } = await getRoomAndUsers(roomId);
      if (!data && error) throw new Error(error);
      dispatch({
        type: "SET_R_USERS",
        payload: { roomAndUsers: data },
      });
      const roomName = data.map((r) => {
        switch (r.access) {
          case "PRIVATE":
            return (
              r.users.find((u) => u.id !== userId)?.username ||
              r.users.find((u) => u.id !== userId)?.email
            );
          case "PUBLIC":
            return r.slug;
        }
      }) as unknown as string;
      setName(roomName);
    };
    getName(rooms.id);
  }, [rooms]);

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
          <div className="w-[100px] truncate">{name}</div>
          <small className="w-[180px] truncate">Message</small>
          <Separator orientation="horizontal" />
        </div>
      </div>
    </div>
  );
}
