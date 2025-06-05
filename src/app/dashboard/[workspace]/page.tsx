"use server";
import CreateWorkspace from "@/components/global/Create-workspace";
import Folders from "@/components/global/folder";
import CreateFolder from "@/components/global/create-folder";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import React from "react";
type props = {
  params: {
    workspace: string;
  };
};
const page = async ({ params }: props) => {
  const { workspace } = await params;
  return (
    <div>
      <Tabs defaultValue="videos" className="mt-6 ">
        <div
          className={
            "flex w-full justify-between items-center flex-wrap gap-10"
          }
        >
          <TabsList className="bg-transparent gap-2 pl-0">
            <TabsTrigger
              value={"videos"}
              className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              value={"archieve"}
              className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
            >
              Archieve
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-col gap-x-3  ">
            <CreateWorkspace />
            <CreateFolder workspaceId={workspace} />
          </div>
        </div>
      </Tabs>
      <Folders workspaceId={workspace} />
    </div>
  );
};

export default page;
