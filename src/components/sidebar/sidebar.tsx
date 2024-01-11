"use client";

import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Userbar from "./userbar";
import Room from "./room";
import { useAppState } from "@/lib/providers/app-state-provider";
import { getRoomAndUsers } from "@/lib/severActions/server-queries";
import { getRoomName } from "@/lib/utils";

type SidebarProps = {
  userId: string;
  className?: string;
  rooms: Rooms[] | [];
};

export default function Sidebar({ rooms, userId, className }: SidebarProps) {
  const { dispatch, state } = useAppState();

  useEffect(() => {
    if (!state.rooms.length) {
      dispatch({
        type: "SET_ROOMS",
        payload: {
          rooms: rooms,
        },
      });
    }

    const getRoomAndUser = async (roomsen: Rooms[]) => {
      const roomsId = roomsen.map((room) => room.id);
      const allRoomData: RoomMember[] = [];
      for (const id of roomsId) {
        const { data, error } = await getRoomAndUsers(id);
        if (data) {
          allRoomData.push(data);
        } else if (error) {
          throw new Error(error);
        }
      }

      if (!state.roomAndUsers.length) {
        dispatch({
          type: "SET_R_USERS",
          payload: { roomAndUsers: allRoomData },
        });
      }
    };
    getRoomAndUser(rooms);
  }, [rooms, state.rooms.length, state.roomAndUsers.length, dispatch]);

  return (
    <aside
      className={twMerge(
        "flex flex-col w-[300px] shrink-0 md:gap-4",
        className
      )}
    >
      <div>
        <Userbar userId={userId} />
      </div>
      <div className="px-4">
        {state.roomAndUsers.map((room, idx) => {
          const roomName = getRoomName(room, userId);
          return <Room rooms={room} key={idx} roomName={roomName} />;
        })}
      </div>
    </aside>
  );
}
