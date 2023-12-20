import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const userStatus = pgEnum("user_status", ["ONLINE", "OFFLINE"]);
export const roomAccess = pgEnum("room_access", ["PRIVATE", "PUBLIC"]);
export const messageType = pgEnum("message_type", [
  "text",
  "picture",
  "video",
  "document",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  username: text("username"),
  email: text("email").notNull(),
  avatarUrl: text("avatar_url"),
  status: userStatus("status").default("OFFLINE").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const rooms = pgTable("rooms", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  slug: text("slug"),
  access: roomAccess("access").default("PRIVATE").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const roomsToUsers = pgTable(
  "rooms_to_users",
  {
    roomId: uuid("room_id")
      .references(() => rooms.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.roomId, t.userId] }),
  })
);

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  type: messageType("type").default("text").notNull(),
  message: text("message"),
  fileUrl: text("file_url"),
  roomId: uuid("room_id").references(() => rooms.id, {
    onDelete: "cascade",
  }),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  willDelete: timestamp("will_delete", {
    withTimezone: true,
    mode: "string",
  }),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const roomsToUsersRelations = relations(roomsToUsers, ({ one }) => ({
  user: one(users, {
    fields: [roomsToUsers.userId],
    references: [users.id],
  }),
  rooms: one(rooms, {
    fields: [roomsToUsers.roomId],
    references: [rooms.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  members: many(roomsToUsers),
}));

export const roomsRelations = relations(rooms, ({ many }) => ({
  members: many(roomsToUsers),
}));
