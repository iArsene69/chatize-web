import { z } from "zod";
import {
  LoginFormSchema,
  RoomSchema,
  SignUpFormSchema,
} from "./lib/form-schema";
import { Database as DB } from "./lib/supabase/supabase.types";

type TABLES = DB["public"]["Tables"];
type ENUMS = DB["public"]["Enums"];

declare global {
  type Database = DB;
  type SignUpForm = z.infer<typeof SignUpFormSchema>;
  type LoginForm = z.infer<typeof LoginFormSchema>;
  type RoomForm = z.infer<typeof RoomSchema>;
  type Users = TABLES["users"]["Row"];
  type Rooms = TABLES["rooms"]["Row"];
  type Messages = TABLES["messages"]["Row"];
  type RoomsAndUser = TABLES["rooms_to_users"]["Row"];
  type RoomMember = Rooms & {
    users: Users[];
  };
}
