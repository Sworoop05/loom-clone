"use client";
import { cn } from "@/lib/utils";
import { Folder } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
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

const LibraryFolder = ({ name, id, optimistic, count }: Props) => {
  const pathname = usePathname();
  const [onRename, setOnRename] = useState(false);
  const [currentName, setCurrentName] = useState(name); // Track current name
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const rename = () => setOnRename(true);
  const renamed = () => setOnRename(false);

  // Handle single click for navigation
  const handlerFolderClick = () => {
    if (!onRename) {
      router.push(`${pathname}/folder/${id}`);
    }
  };

  // Handle double click for renaming
  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    rename();
  };

  // Optimistic mutation
  const { mutate, isPending } = useMutationData(
    ["rename-folders"],
    (data: { name: string }) => renameFolders(id, data.name), // Fixed: pass data.name
    "workspace-folders"
  );

  // Update folder name and save to database
  const updateFolderName = () => {
    const newName = inputRef.current?.value.trim();
    if (newName && newName !== currentName) {
      setCurrentName(newName); // Update local state immediately
      mutate({ name: newName });
      console.log("New name:", newName);
    }
    renamed();
  };

  // Handle click outside to save changes
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // console.log(folderCardRef.current.contains(event.target as Node));
      console.log(event.target);
      if (
        onRename &&
        folderCardRef.current &&
        !folderCardRef.current.contains(event.target as Node)
      ) {
        updateFolderName();
      }
    };

    if (onRename) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onRename, currentName]);

  // Handle Enter key to save changes
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateFolderName();
    } else if (e.key === "Escape") {
      renamed(); // Cancel rename without saving
    }
  };

  return (
    <div
      onClick={handlerFolderClick}
      ref={folderCardRef}
      className={cn(
        optimistic && "opacity-60",
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px]"
      )}
    >
      <div className="flex flex-col gap-[1px]">
        {onRename ? (
          <Input
            autoFocus
            onBlur={updateFolderName}
            onKeyDown={handleKeyDown}
            defaultValue={currentName}
            ref={inputRef}
            className="border-none pl-1 w-full outline-none bg-transparent"
          />
        ) : (
          <p
            className="text-neutral-300"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={handleNameDoubleClick}
          >
            {currentName}
          </p>
        )}
        <span className="text-sm text-neutral-500">{count || 0} videos</span>
      </div>
      <Folder />
    </div>
  );
};

export default LibraryFolder;
