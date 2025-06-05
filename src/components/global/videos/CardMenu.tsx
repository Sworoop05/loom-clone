import React from "react";
import Modal from "../modal";
import { Move } from "lucide-react";
import ChangeVideoLocation from "../form/ChangeVideoLocation";

type Props = {
  VideoId: string;
  currentWorkspace: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const CardMenu = ({
  VideoId,
  currentWorkspace,
  currentFolder,
  currentFolderName,
}: Props) => {
  return (
    <Modal
      trigger={<Move size={20} fill="#a4a4a4" className="text-[#a4a4a4]" />}
      title={"Move to new workspace / folder"}
      description={
        "This action cannot be undone. This will permanently delete your account."
      }
      className="flex items-center cursor-pointer ga-x-2"
    >
      <ChangeVideoLocation
        currentFolderName={currentFolderName}
        currentFolder={currentFolder}
        currentWorkspace={currentWorkspace}
        VideoId={VideoId}
      />
    </Modal>
  );
};

export default CardMenu;
