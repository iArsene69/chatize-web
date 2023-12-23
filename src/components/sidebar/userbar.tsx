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

type UserbarProps = {
  userId: string;
};

export default function Userbar({ userId }: UserbarProps) {
  const { user, error: userError } = useSupabaseUser();
  const {state, dispatch} = useAppState()
  const { toast } = useToast();
  const form = useForm<RoomForm>({
    mode: "onChange",
    resolver: zodResolver(RoomSchema),
    defaultValues: { access: "PRIVATE", targetId: "", creatorId: "", slug: "" },
  });

  const isLoading = form.formState.isSubmitting;

  // TODO: check if targeted user is already have a room with the creator
  const onSubmit = async ({ targetId, access }: RoomForm) => {
    if (userError || !user) {
      return;
    }

    const newRoom: RoomForm = {
      access,
      targetId,
      creatorId: user.id,
      slug: `${access}.${v4()}`,
    };
    const { error } = await createRoom(newRoom);
    if (error) {
      toast({
        title: "Failed",
        variant: "destructive",
        description: "Unable to create room",
      });
      form.reset();
      return;
    }
    toast({
      title: "Success",
      description: "New chat room created!",
    });
  };

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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="access"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Privacy mode</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex justify-start gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              disabled={isLoading}
                              defaultChecked
                              value="PRIVATE"
                            />
                          </FormControl>
                          <FormLabel>PRIVATE</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              disabled={isLoading}
                              value="PUBLIC"
                            />
                          </FormControl>
                          <FormLabel>PUBLIC</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="text"
                        placeholder="user id"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit">
                {!isLoading ? "Create" : "Loading..."}
              </Button>
            </form>
          </Form>
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
