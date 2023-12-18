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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { createRoom } from "@/lib/severActions/server-querries";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type UserbarProps = {
  userId: string;
};

const RoomSchema = z.object({
  targetId: z.string().describe("targetUserId").uuid({ message: "Invalid id" }),
  access: z
    .enum(["PRIVATE", "PUBLIC"], {
      required_error: "You must select privacy access",
    })
    .default("PRIVATE"),
});

export default function Userbar({ userId }: UserbarProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof RoomSchema>>({
    mode: "onChange",
    resolver: zodResolver(RoomSchema),
    defaultValues: { access: "PRIVATE", targetId: "" },
  });

  const supabase = createClientComponentClient();

  const isLoading = form.formState.isSubmitting;

  // TODO: create submit function
  const onSubmit = async ({ targetId, access }: z.infer<typeof RoomSchema>) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const newRoom = {
      creator: user.id,
      target: targetId,
      access,
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
    <div className="flex justify-between items-center w-full h-full bg-muted-foreground p-4">
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
                            <RadioGroupItem defaultChecked value="PRIVATE" />
                          </FormControl>
                          <FormLabel>PRIVATE</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="PUBLIC" />
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
                      <Input type="text" placeholder="user id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
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
