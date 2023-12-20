ALTER TABLE "members" RENAME TO "rooms_to_users";--> statement-breakpoint
ALTER TABLE "rooms_to_users" DROP CONSTRAINT "members_room_id_rooms_id_fk";
--> statement-breakpoint
ALTER TABLE "rooms_to_users" DROP CONSTRAINT "members_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rooms_to_users" ADD CONSTRAINT "rooms_to_users_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rooms_to_users" ADD CONSTRAINT "rooms_to_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "rooms_to_users" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "rooms_to_users" ADD CONSTRAINT "rooms_to_users_room_id_user_id_pk" PRIMARY KEY("room_id","user_id");