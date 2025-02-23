"use client";
import { Workspace } from "@prisma/client";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  workspace: Workspace;
};

const GlobalHeader = ({ workspace }: Props) => {
  const pathname = usePathname().split(`/dashnboard/${workspace.id}`)[1];
  return (
    <article className="flex flex-col gap-2">
      <span className="text-[#707070] text-xs">
        {workspace.type.toUpperCase()}
        <h1 className={"text-4xl font-bold text-white"}>
          {pathname && !pathname.includes("folder")
            ? pathname.charAt(0).toUpperCase() + pathname.slice(1).toLowerCase()
            : "My library"}
        </h1>
      </span>
    </article>
  );
};

export default GlobalHeader;
