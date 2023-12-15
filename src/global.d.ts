import { z } from "zod";
import { FormSchema, SignUpFormSchema } from "./lib/form-schema";
import { Database as DB } from "./lib/supabase/supabase.types";

declare global {
  type Database = DB;
  type SignUpForm = z.infer<typeof SignUpFormSchema>;
  type Form = z.infer<typeof FormSchema>;
}

