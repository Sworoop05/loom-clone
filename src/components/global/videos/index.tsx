"use client";
import { getAllUserVideos } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { VideosProp } from "@/types/index.type";
import { VideoIcon } from "lucide-react";
import React from "react";
import VideoCard from "./VideoCard";

type Props = {
  folderId: string;
  videoKey: string;
  workspaceId: string;
};

export const Video = ({ folderId, videoKey, workspaceId }: Props) => {
  const { data } = useQueryData([videoKey], () => getAllUserVideos(folderId));
  const { status: videoStatus, data: videoData } = data as VideosProp;
  console.log(videoData);
  return (
    <div className={"flex flex-col gap-4 mt-4"}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <VideoIcon />
          <h2 className={"text-[#BdBdBd] text-xl"}> Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videoStatus !== 200
            ? "p-5"
            : "grid p-6 justify-start item-start grid-col-1 gap-10 md:grid-col-2 lg:grid-col-3 xl:grid-col-4 2xl:grid-col-5"
        )}
      >
        {videoStatus == 200 && Array.isArray(videoData) ? (
          videoData.map((video) => (
            <VideoCard
              User={video.User}
              id={video.id}
              processing={video.processing}
              Folder={video.Folder}
              createdAt={video.createdAt}
              title={video.title}
              workspaceId={workspaceId}
              source={video.source}
              key={video.id}
            />
          ))
        ) : (
          <p className="text-[#BdBdBd]">No videos in this folder</p>
        )}
      </section>
    </div>
  );
};
