import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppState } from "@/lib/providers/app-state-provider";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { getRoomName } from "@/lib/utils";

type MessageHeaderProps = {
  selectedRooms?: Rooms;
};

export default function MessageHeader({ selectedRooms }: MessageHeaderProps) {
  const { state } = useAppState();
  const { user } = useSupabaseUser();
  if (!user) return;
  const roomMember = state.roomAndUsers.find(
    (member) => member.id === state.selectedRoom?.id
  );
  if (!roomMember) return;
  const roomName = getRoomName(roomMember, user?.id);
  return (
    <div className="flex justify-start gap-4 bg-primary px-4 py-4">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <div className="text-xl">{roomName}</div>
    </div>
  );
}
