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

    const RoomAndUserMap = new Map<string, RoomMember>();
    response.forEach((res) => {
      const {
        rooms: { id, access, slug, createdAt },
        user,
      } = res;

      const UserObj: Users = {
        id: user.id,
        email: user.email,
        username: user.username,
        status: user.status,
        avatar_url: user.avatarUrl,
        created_at: user.createdAt,
      };

      if (!RoomAndUserMap.has(id)) {
        RoomAndUserMap.set(id, {
          access,
          created_at: createdAt,
          id,
          slug,
          users: [UserObj],
        });
      } else {
        const existingRoom = RoomAndUserMap.get(id);
        if (existingRoom) {
          existingRoom.users.push(UserObj);
        }
      }
    });

    if (RoomAndUserMap.size)
      return { data: Array.from(RoomAndUserMap.values()), error: null };
    return { data: [], error: null };
  } catch (error) {
    return {
      data: [],
      error: "Something went wrong when fetch users and rooms",
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
