"use server";

import { rooms, roomsToUsers, users } from "../../../drizzle/schema";
import db from "../supabase/db";

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
      await db.insert(roomsToUsers).values([
        { roomId: room.roomId, userId: creatorId },
        { roomId: room.roomId, userId: targetId },
      ]);
    });

    return { error: "" };
  } catch (error) {
    return { error: error };
  }
};

export const getRoomAndUsers = async (roomId: string) => {
  try {
    const response = await db.query.roomsToUsers.findMany({
      where: (m, { eq }) => eq(m.roomId, roomId),
      with: {
        user: true,
        rooms: true,
      },
    });

    let roomMember;

    response.forEach((res) => {
      const {
        rooms: { id, access, slug, createdAt },
        user,
      } = res;

      const userObj: Users = {
        id: user.id,
        email: user.email as string,
        username: user.username,
        status: user.status,
        avatar_url: user.avatarUrl,
        created_at: user.createdAt as string,
      };

      roomMember = {
        access,
        created_at: createdAt as string,
        id,
        slug,
        users: [userObj],
      };
    });

    if (roomMember) {
      return { data: roomMember, error: null };
    }

    return { data: null, error: null };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong when fetching users and room",
    };
  }
};

export const getRooms = async (userId: string) => {
  try {
    const res = await db.query.roomsToUsers.findMany({
      where: (m, { eq }) => eq(m.userId, userId),
      with: {
        rooms: true,
      },
    });

    if (res.length)
      return {
        data: res.map((m) => {
          return m.rooms;
        }) as unknown as Rooms[],
        error: null,
      };
    return { data: [], error: null };
  } catch (error) {
    return {
      data: [],
      error: `Something went wrong when fetching rooms ${error}`,
    };
  }
};
