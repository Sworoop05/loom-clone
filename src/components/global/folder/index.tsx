"use client";
import React from "react";
import { ArrowRight, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import LibraryFolder from "../library-folder";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorkspaceFolders } from "@/actions/workspace";
import { useMutationStateData } from "@/hooks/useMutationState";
type Props = {
  workspaceId: string;
};
export type foldersProps = {
  status: number;
  data: {
    _count: {
      videos: number;
    };
    id: string;
    name: string;
    createdAT: Date;
    workspaceId: string | null;
  }[];
};

// get folders
const Folders = ({ workspaceId }: Props) => {
  const { data, isFetched } = useQueryData(["workspace-folders"], () =>
    getWorkspaceFolders(workspaceId)
  );
  const { latestVariables } = useMutationStateData(["create-folder"]);
  const { status, data: folders } = data as foldersProps;
  // if(isFetched && folder){

  // }
  return (
    <div className="flex flex-col gap-4 mt-2 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Folder />
          <h2 className="text-[#BDBDBD] text-xl">folders </h2>
        </div>
        <div className="flex item-center gap-2">
          <p className="text-[#BDBDBD]"> see all </p>
          <ArrowRight color="#707070"></ArrowRight>
        </div>
      </div>
      <section
        className={cn(
          status != 200
            ? "flex justify-center"
            : "flex items-center gap-4 overflow-x-auto w-full"
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300">No folder in the workspace</p>
        ) : (
          <>
            <LibraryFolder name="Default folder" id="jkdnfkjb" count={1} />
            {folders.map((item) => (
              <LibraryFolder
                name={item.name}
                id={item.id}
                count={item._count.videos}
                optimistic={false}
                key={item.id}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;
