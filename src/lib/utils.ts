import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRoomName(room: RoomMember, userId: string): string {
  if (!room) return "No room";
  if (!userId) return "No user";

  let roomName: string;

  switch (room.access) {
    case "PRIVATE":
      roomName =
        room.users.find((u) => u.id !== userId)?.username ||
        room.users.find((u) => u.id !== userId)?.email ||
        "";
      break;
    case "PUBLIC":
      roomName = room.slug || "";
      break;
  }

  if (!roomName) {
    roomName = "No room name";
  }

  return roomName;
}
