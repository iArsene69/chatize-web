import Sidebar from "@/components/sidebar/sidebar";
import { getRooms } from "@/lib/severActions/server-queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

export default async function ChatPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) {
    throw new Error(authError.message);
  }
  if (!user) return;

  const { data: rooms, error } = await getRooms(user.id);
  if (error) throw new Error(error);
  return (
    <main className="flex flex-row overflow-hidden h-screen">
      <Sidebar rooms={rooms} userId={user.id} />
      <div className="w-full relative">
        {children}
      </div>
    </main>
  );
}
