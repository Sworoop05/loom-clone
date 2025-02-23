"use client";
import React from "react";
import { Button } from "../../ui/button";
import { Folder } from "lucide-react";
import { useCreateFolder } from "@/hooks/useCreateFolder";

type Props = { workspaceId: string };

const CreateFolder = ({ workspaceId }: Props) => {
  const { onCreateNewFolder } = useCreateFolder(workspaceId);
  return (
    <Button
      className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl"
      onClick={onCreateNewFolder}
    >
      <Folder />
      Create a folder
    </Button>
  );
};

export default CreateFolder;
