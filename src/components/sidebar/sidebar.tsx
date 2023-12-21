"use client";

import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Userbar from "./userbar";
import Room from "./room";
import { useAppState } from "@/lib/providers/app-state-provider";

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
  }, [rooms]);

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
        {rooms.map((room, idx) => (
          <Room rooms={room} userId={userId} key={idx} />
        ))}
      </div>
    </aside>
  );
}
