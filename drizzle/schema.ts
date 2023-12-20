import { pgTable, pgEnum, uuid, text, timestamp, foreignKey, primaryKey } from "drizzle-orm/pg-core"
  import { relations, sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])
export const messageType = pgEnum("message_type", ['document', 'video', 'picture', 'text'])
export const roomAccess = pgEnum("room_access", ['PUBLIC', 'PRIVATE'])
export const userStatus = pgEnum("user_status", ['OFFLINE', 'ONLINE'])


export const rooms = pgTable("rooms", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	slug: text("slug"),
	access: roomAccess("access").default('PRIVATE').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	username: text("username"),
	email: text("email"),
	avatarUrl: text("avatar_url"),
	status: userStatus("status").default('OFFLINE').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
});

export const messages = pgTable("messages", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	type: messageType("type").default('text').notNull(),
	message: text("message"),
	fileUrl: text("file_url"),
	roomId: uuid("room_id").references(() => rooms.id, { onDelete: "cascade" } ),
	userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" } ),
	willDelete: timestamp("will_delete", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const roomsToUsers = pgTable("rooms_to_users", {
	roomId: uuid("room_id").notNull().references(() => rooms.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		roomsToUsersRoomIdUserIdPk: primaryKey({ columns: [table.roomId, table.userId], name: "rooms_to_users_room_id_user_id_pk"})
	}
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
  