"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageCircle, Settings } from "lucide-react";
import CustomTooltip from "../global/custom-tooltip";
import { SheetHeader } from "../ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { createRoom } from "@/lib/severActions/server-queries";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { RoomSchema } from "@/lib/form-schema";
import { v4 } from "uuid";
import { useAppState } from "@/lib/providers/app-state-provider";
import RoomCreator from "../global/room-creator";

type UserbarProps = {
  userId: string;
};

export default function Userbar({ userId }: UserbarProps) {
  return (
    <div className="flex justify-between items-center w-full h-full bg-primary p-4">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <div className="flex justify-evenly gap-4">
        <CustomTooltip
          trigger={<MessageCircle className="text-white" />}
          content={<p>New chat</p>}
        >
          <SheetHeader className="text-2xl">New chat</SheetHeader>
          <RoomCreator />
        </CustomTooltip>
        <CustomTooltip
          trigger={<Settings className="text-white" />}
          content={<p>Settings</p>}
        >
          Hello
        </CustomTooltip>
      </div>
    </div>
  );
}
