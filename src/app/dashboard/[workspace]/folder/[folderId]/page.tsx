import { getFolderInfo } from "@/actions/folder";
import { getAllUserVideos } from "@/actions/workspace";
import FolderInfo from "@/components/global/create-folder/folderInfo";
import { Video } from "@/components/global/videos";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
interface prop {
  params: {
    folderId: string;
    workspaceId: string;
  };
}
const page = async ({ params }: prop) => {
  const { folderId, workspaceId } = params;
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["folder-videos"],
    queryFn: () => getAllUserVideos(folderId),
  });
  await query.prefetchQuery({
    queryKey: ["folder-info"],
    queryFn: () => getFolderInfo(folderId),
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div>
        <FolderInfo folderId={folderId} />
        <Video
          folderId={folderId}
          videoKey={"folder-videos"}
          workspaceId={workspaceId}
        />
      </div>
    </HydrationBoundary>
  );
};
export default page;
