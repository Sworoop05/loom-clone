import React from "react";
import Loader from "../loading";
import CardMenu from "./CardMenu";
import CopyLink from "./CopyLink";
import Link from "next/link";
type Props = {
  User: {
    firstName: string | null;
    lastName: string | null;
    image: string | null;
  } | null;
  id: string;
  processing: boolean;
  Folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title: string | null;
  workspaceId: string;
  source: string;
};

const VideoCard = (props: Props) => {
  const daysAgo = Math.floor(
    (new Date().getTime() - props.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );
  console.log(props);
  //WIP: wire up the date
  return (
    <Loader state={props.processing}>
      <div
        className={
          " overflow-hidden cursor-pointer  relative border-[1px]  border-[#252525] flex flex-col  rounded-xl"
        }
      >
        <div className="absolute top-3 right-3 z-50 flex flex-col gap-8 ">
          <CardMenu
            VideoId={props.id}
            currentFolderName={props.Folder?.name}
            currentFolder={props.Folder?.id}
            currentWorkspace={props.workspaceId}
          />
          <CopyLink
            className="p-0 h-5  bg-hover:bg-transparent"
            videoId={props.id}
          />
        </div>
        <Link
          href={`/preview/${props.id}`}
          className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
        >
          <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-20"
          ></video>
        </Link>
      </div>
    </Loader>
  );
};

export default VideoCard;
