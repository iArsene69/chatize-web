import { z } from "zod";
import { FormSchema, SignUpFormSchema } from "./lib/form-schema";
import { Database as DB } from "./lib/supabase/supabase.types";

type TABLES = DB["public"]["Tables"];
type ENUMS = DB["public"]["Enums"];

declare global {
  type Database = DB;
  type SignUpForm = z.infer<typeof SignUpFormSchema>;
  type Form = z.infer<typeof FormSchema>;
  type Users = TABLES["users"]["Row"];
  type Rooms = TABLES["rooms"]["Row"];
  type Messages = TABLES["messages"]["Row"];
}
