import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

export default function ChatPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-row overflow-hidden h-screen w-screen">
      <Sidebar rooms={"rooms"} userId={"user"} />
      <div className="border border-primary/75 border-1-[1px] w-full relative overflow-y-scroll">
        {children}
      </div>
    </main>
  );
}
