"use client";

import React, { useState } from "react";
import { File, Image, Plus, Video } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type TypeDropdownProps = {
  onInputFile: (
    type: keyof typeof MessageType,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export default function TypeDropdown({ onInputFile }: TypeDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<keyof typeof MessageType>("text");
  console.log(type);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setOpen((prev) => !prev)}
          size="icon"
          className="rounded-full"
        >
          <Plus
            className={`${
              open ? "animate-rotate-90 rotate-45" : "rotate-0"
            } transition-all`}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <div className="flex justify-evenly items-center">
          <Button
            onClick={(e) => setType("picture")}
            className="bg-gradient-to-br from-pink-600 to-primary rounded-full"
            size="icon"
          >
            <label>
              <input
                type="file"
                onChange={(e) => {
                  if (!e.target.files) return;
                  const localUrl = e.target.files[0].type;
                  console.log(localUrl);
                }}
                hidden
                accept="image/png, .jpg"
              />
              <Image className="cursor-pointer" />
            </label>
          </Button>
          <Button
            onClick={() => setType("video")}
            className="bg-gradient-to-br from-purple-600 to-primary rounded-full"
            size="icon"
          >
            <label>
              <input
                type="file"
                onChange={async (e) => await onInputFile(type, e)}
                hidden
                accept="video/mp4"
              />
              <Video className="cursor-pointer" />
            </label>
          </Button>
          <Button
            onClick={() => setType("document")}
            className="bg-gradient-to-br from-indigo-600 to-primary rounded-full"
            size="icon"
          >
            <label>
              <input
                type="file"
                onChange={async (e) => await onInputFile(type, e)}
                hidden
                multiple
              />
              <File className="cursor-pointer" />
            </label>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
