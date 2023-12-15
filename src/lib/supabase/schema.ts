import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

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
