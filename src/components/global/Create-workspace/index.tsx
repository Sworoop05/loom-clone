"use client";
import { getWorkspaces } from "@/actions/workspace";
import { userQueryData } from "@/hooks/userQueryData";
import { Workspace } from "@/types/index.type";
import React from "react";
import Modal from "../modal";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import WorkspaceForm from "../workspace-form";
type Props = {};

const CreateWorkspace = (props: Props) => {
  const { data } = userQueryData(["user-workspaces"], getWorkspaces);
  const { data: plan } = data as {
    status: number;
    data: {
      workspaces: {
        id: string;
        type: "PERSONAL" | "PUBLIC";
        name: string;
      };
      subscription: {
        id: string;
        plan: "FREE" | "PRO";
      };
      members: {
        id: string;
        workspace: Workspace;
      };
    };
  };

  if (plan.subscription.plan === "FREE") {
    return (
      <>
        <Modal
          trigger={
            <Button className="bg-[1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl text-xl">
              <FolderPlus size={25} />
              create a workspace
            </Button>
          }
          title={"Create a workspace"}
          description={`Workspace helps you collaborate with team members.
            You are assigned a default personal workspace where you can share videos in private with yourself`}
        >
          <h2 className="w-full text-xl font-bold ">
            {" "}
            Please upgrade to PRO!!
          </h2>
        </Modal>
      </>
    );
  }
  if (plan.subscription.plan === "PRO") {
    return (
      <Modal
        trigger={
          <Button className="bg-[1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl">
            <FolderPlus />
            create a workspace
          </Button>
        }
        title={"Create a workspace"}
        description={`Workspace helps you collaborate with team members.
            You are assigned a default personal workspace where you can share videos in private with yourself`}
      >
        <WorkspaceForm />
      </Modal>
    );
  }
};

export default CreateWorkspace;
