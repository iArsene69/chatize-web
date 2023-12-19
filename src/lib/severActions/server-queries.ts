"use server";

import { members, rooms, users } from "../../../drizzle/schema";
import db from "../supabase/db";

//TODO: createRoom function
export const createRoom = async ({
  creatorId,
  targetId,
  access,
  slug,
}: RoomForm) => {
  try {
    const targetUser = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.id, targetId),
    });
    if (!targetUser) throw new Error("Target user can't be found");

    const insertRooms = await db
      .insert(rooms)
      .values({ access, slug })
      .returning({ roomId: rooms.id });
    if (!insertRooms) throw new Error("Failed to create room");

    insertRooms.map(async (room) => {
      await db.insert(members).values([
        { roomId: room.roomId, userId: creatorId },
        { roomId: room.roomId, userId: targetId },
      ]);
    });

    return { error: "" };
  } catch (error) {
    return {error: error}
  }
};
