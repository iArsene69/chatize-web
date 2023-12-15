"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function actionLogin({ email, password }: Form) {
  const supabase = createRouteHandlerClient({ cookies });
  const res = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return res;
}

export async function actionSignUp({ email, password }: Form) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase.from("users").select("*").eq("email", email);

  if (data?.length)
    return { error: { message: "User with same e-mail already exist" } };
  const res = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });
  return res;
}
