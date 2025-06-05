"use client";
import { getFolderInfo } from "@/actions/folder";
import { useQueryData } from "@/hooks/useQueryData";
import { folderProps } from "@/types/index.type";
import React from "react";

type Props = {
  folderId: string;
};

const FolderInfo = ({ folderId }: Props) => {
  const { data } = useQueryData(["folder-info"], () =>
    getFolderInfo(folderId)
  );
  const { data: folderName } = data as folderProps;
  return (
    <div className={"flex item-center"}>
      <h1 className={"text-[#BdBdBd] text-2xl"}>{folderName.name}</h1>
    </div>
  );
};

export default FolderInfo;
