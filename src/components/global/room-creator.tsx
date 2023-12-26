import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import React from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { RoomSchema } from "@/lib/form-schema";
import { createRoom } from "@/lib/severActions/server-queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { useToast } from "../ui/use-toast";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { useAppState } from "@/lib/providers/app-state-provider";

export default function RoomCreator() {
  const { state } = useAppState();
  const { user, error: userError } = useSupabaseUser();
  const { toast } = useToast();
  const form = useForm<RoomForm>({
    mode: "onChange",
    resolver: zodResolver(RoomSchema),
    defaultValues: { access: "PRIVATE", targetId: "", creatorId: "", slug: "" },
  });

  const isLoading = form.formState.isSubmitting;

  // TODO: check if targeted user is already have a room with the creator
  const onSubmit = async ({ targetId, access, slug }: RoomForm) => {
    if (userError || !user) {
      return;
    }

    const isUserAlreadyExist = state.roomAndUsers.every((m) => {
      return m.users.find((u) => u.id === targetId);
    });

    if (access === "PRIVATE" && isUserAlreadyExist) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "You already have that user at your private room",
      });
      return;
    }

    const newRoom: RoomForm = {
      access,
      targetId,
      creatorId: user.id,
      slug: access === "PRIVATE" ? `PRIVATE.${v4()}` : slug,
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
                      <RadioGroupItem disabled={isLoading} value="PUBLIC" />
                    </FormControl>
                    <FormLabel>PUBLIC</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        {form.getValues("access") === "PUBLIC" && (
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="text"
                    placeholder="room name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
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
  );
}
