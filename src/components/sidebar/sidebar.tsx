'use client'

import React from "react";
import { twMerge } from "tailwind-merge";
import Userbar from "./userbar";
import Room from "./room";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";

type SidebarProps = {
  userId: string;
  className?: string;
};

export default function Sidebar({ userId, className }: SidebarProps) {
  const { user, rooms, error } = useSupabaseUser();
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
          <Room rooms={room} key={idx} />
        ))}
        <p>{error}</p>
      </div>
    </aside>
  );
}
