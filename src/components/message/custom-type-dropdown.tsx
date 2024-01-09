"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export default function TypeDropdown() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button onClick={() => setOpen((prev) => !prev)} size="icon" className="rounded-full">
          <Plus
            className={`${
              open ? "animate-rotate-90 rotate-45" : "rotate-0"
            } transition-all`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup className="flex justify-evenly items-center">
          <DropdownMenuItem>1</DropdownMenuItem>
          <DropdownMenuItem>2</DropdownMenuItem>
          <DropdownMenuItem>3</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
