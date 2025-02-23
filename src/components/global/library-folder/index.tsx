"use client";
import { cn } from "@/lib/utils";
import { Folder } from "lucide-react";
import React, { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMutationData } from "@/hooks/use-mutation";
import { renameFolders } from "@/actions/workspace";
import { Input } from "@/components/ui/input";

type Props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

//WIP: take the value from the input box and change the name in useMutate
const LibraryFolder = ({ name, id, optimistic, count }: Props) => {
  const [onRename, setOnRename] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const rename = () => setOnRename(true);
  const renamed = () => setOnRename(false);
  const handlerFolderClick = () => {
    if (!onRename) {
      router.push(`${pathname}/folder/${id}`);
    }
  };
  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    rename();
  };
  //optimistic
  const { mutate, isPending } = useMutationData(
    ["rename-folders"],
    (data: { name: string }) => renameFolders(id, name),
    "workspace-folders"
  );
  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current && folderCardRef.current) {
      if (
        !inputRef.current.contains(e.target as Node | null) &&
        !folderCardRef.current.contains(e.target as Node | null)
      ) {
        if (inputRef.current.value) {
          mutate({ name: inputRef.current.value });
          renamed();
        } else {
          renamed();
        }
      }
    }
  };
  return (
    <div
      onClick={handlerFolderClick}
      ref={folderCardRef}
      className={cn(
        optimistic && "opacity-60",
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 item-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px]"
      )}
    >
      <div className="flex flex-col gap-[1px]">
        {onRename ? (
          <Input
            autoFocus
            onBlur={updateFolderName}
            placeholder={name}
            className={`border-none pl-1 w-full outline-none  bg-transparent 
        `}
            ref={inputRef}
          />
        ) : (
          <p
            className="text-neutral-300"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={handleNameDoubleClick}
          >
            {name}
          </p>
        )}
        <span className="text-sm text-neutral-500">{count || 0} videos</span>
      </div>
      <Folder></Folder>
    </div>
  );
};

export default LibraryFolder;
