"use client";
import { getWorkspaces } from "@/actions/workspace";
import { WorkspaceProp } from "@/types/index.type";
import Logo from "@/app/_components/logo";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { userQueryData } from "@/hooks/userQueryData";
import { useRouter } from "next/router";
import React from "react";

type Props = { activeWorkspaceId: string };

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const onChangeWorkspaceValue = (value: string) => {
    router.push(`/dashboard/${value}`);
  };
  const { data, isFetched } = userQueryData(["user-workspaces"], getWorkspaces);
  const { data: workspace } = data as WorkspaceProp;
  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] absolute p-4 gap-2 justify-center items-center mb-4 top-0 left-0 right-0">
        <Logo />
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeWorkspaceValue}
      >
        <SelectTrigger className="m-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspace.workspace.map((workspace) => (
              <SelectItem id={workspace.id} value={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sidebar;
