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

      <PopoverContent className="w-fit">
        <div className="flex justify-evenly flex-col gap-4 items-start">
          <Button
            onClick={() => setType("picture")}
            variant="outline"
            className="bg-transparent border-none flex justify-center gap-2"
          >
            <label>
              <input
                type="file"
                onChange={(e) => {
                  onInputFile(type, e);
                  setType("text");
                  setOpen(false);
                }}
                hidden
                accept="image/png, .jpg"
              />
              <Image className="cursor-pointer text-blue-600" />
            </label>
            <p>Picture</p>
          </Button>
          <Button
            onClick={() => setType("video")}
            variant="outline"
            className="bg-transparent border-none flex justify-center gap-2"
          >
            <label>
              <input
                type="file"
                onChange={(e) => {
                  onInputFile(type, e);
                  setType("text");
                  setOpen(false);
                }}
                hidden
                accept="video/mp4"
              />
              <Video className="cursor-pointer text-purple-600" />
            </label>
            <p>Video</p>
          </Button>
          <Button
            onClick={() => setType("document")}
            variant="outline"
            className="bg-transparent border-none flex justify-center gap-2"
          >
            <label>
              <input
                type="file"
                onChange={(e) => {
                  onInputFile(type, e);
                  setType("text");
                  setOpen(false);
                }}
                hidden
                multiple
              />
              <File className="cursor-pointer text-red-600" />
            </label>
            <p>Document</p>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
