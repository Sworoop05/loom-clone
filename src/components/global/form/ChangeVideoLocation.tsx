import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useMoveVideo } from "@/hooks/useMoveVideo";
import React from "react";

type Props = {
  VideoId: string;
  currentWorkspace: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const ChangeVideoLocation = ({
  currentFolderName,
  currentFolder,
  currentWorkspace,
  VideoId,
}: Props) => {
  const {
    onFormSubmit,
    errors,
    register,
    isPending,
    folders,
    isFetching,
    isFolders,
    workspaces,
  } = useMoveVideo(VideoId, currentWorkspace);
  const folder = folders?.filter((f) => f.id === currentFolder);
  const workspace = workspaces?.filter((f) => f.id === currentWorkspace);
  console.log(workspaces);
  return (
    <form className="flex flex-col gap-y-5 ">
      <div className="border-[1px] rounded-xl p-5">
        <h2 className="text-xs mb-5 text-[#a4a4a4] ">current</h2>
        {workspace && <p className="text-[#a4a4a4]">workspace</p>}
        <p className="text-[#a4a4a4] text-sm">
          This video has no folder for now
        </p>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2 className="text-[#a4a4a4] text-xs">To</h2>
        <Label className="flex-col gap-y-2 flex">
          <p className="text-xs">workspace</p>
          <select
            {...register("workspace_id")}
            className="rounded-xl text-base bg-transparent"
          >
            <option value="someting">workspace</option>
          </select>
        </Label>
      </div>
    </form>
  );
};

export default ChangeVideoLocation;
