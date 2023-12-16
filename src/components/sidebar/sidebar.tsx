import React from "react";
import { twMerge } from "tailwind-merge";
import Userbar from "./userbar";
import Room from "./room";

type SidebarProps = {
  userId: string;
  rooms: string;
  className?: string;
};

export default function Sidebar({ rooms, userId, className }: SidebarProps) {
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
        <Room rooms={rooms} />
      </div>
    </aside>
  );
}
