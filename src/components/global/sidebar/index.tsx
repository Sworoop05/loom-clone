"use client";
import { getWorkspaces } from "@/actions/workspace";
import { error, NotificationProps, WorkspaceProp } from "@/types/index.type";
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
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Modal from "../modal";
import { Ghost, Menu, PlusCircle } from "lucide-react";
import SearchWorkSpace from "../search";
import Search from "../search";
import { Menu_Items } from "@/constant";
import SidebarItems from "./sidebar-items";
import { getNotification } from "@/actions/notification";
import WorkspacePlaceholder from "./WorkspacePlaceholder";
import GlobalCard from "../GlobalCard/GlobalCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Infobar from "../Info-bar";

type Props = {
  activeWorkspaceId: string;
  initialData: WorkspaceProp;
};

const Sidebar = ({ activeWorkspaceId, initialData }: Props) => {
  const router = useRouter();
  const { data, isFetched } = userQueryData(["user-workspaces"], getWorkspaces);
  const { data: notifications } = userQueryData(
    ["user-notifications"],
    getNotification
  );
  const { data: count } = notifications as NotificationProps;
  const workspace = (data as WorkspaceProp)?.data ?? initialData?.data;
  const pathName = usePathname();
  const menuItems = Menu_Items(activeWorkspaceId);
  const onChangeWorkspaceValue = (value: string) => {
    router.push(`/dashboard/${value}`);
  };
  const currentWorkspace = workspace.workspaces.find(
    (s) => s.id == activeWorkspaceId
  );

  //WIP: add the upgrade button
  const SideBar = (
    <div className="bg-[#111111] flex-none relative p-4 pb-20 h-full w-[250px] flex flex-col gap-4 items-center  ">
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
            {workspace?.workspaces.map((workspace) => (
              <SelectItem
                id={workspace.id}
                value={workspace.id}
                key={workspace.id}
              >
                {workspace.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {workspace.subscription?.plan === "PRO" &&
        currentWorkspace?.type == "PUBLIC" && (
          <Modal
            trigger={
              <span
                className={`text-sm cursor-pointer flex items-center justify-center border-t-neutral-800/80 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2`}
              >
                <PlusCircle
                  size={15}
                  className="text-neutral-800/80 fill-neutral-500"
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite to workspace
                </span>
              </span>
            }
            title={"Invite to workspace"}
            description={"Invite other users in workspace"}
          >
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}
      <p className="w-full text-[#9D9D9D] font-bold ">Menu</p>
      <nav className="w-full ">
        {menuItems.map((item) => (
          <SidebarItems
            key={item.title}
            title={item.title}
            href={item.href}
            Icon={item.icon}
            selected={pathName == item.href ? true : false}
            notifications={
              (item.title == "Notifications" &&
                count._count &&
                count._count.notifications) ||
              0
            }
          />
        ))}
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Workspace </p>
      {workspace.workspaces.length == 1 && workspace.members.length == 0 && (
        <div className="w-full mt-[-10px]">
          <p className=" text-[#3c3c3c] font-medium text-sm">
            {workspace.subscription?.plan == "FREE"
              ? "Upgrade to create workspace"
              : "No workspace"}
          </p>
        </div>
      )}
      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workspace.workspaces.length > 0 &&
            workspace.workspaces.map((item) => (
              <SidebarItems
                title={item.name}
                href={`/dashboard/${item.id}`}
                key={item.name}
                NameIcon={
                  <WorkspacePlaceholder>
                    {item.name.charAt(0)}
                  </WorkspacePlaceholder>
                }
                selected={pathName == `dashboard/${item.id}`}
              />
            ))}
          {workspace.members.length > 1 &&
            workspace.members.map((item) => (
              <SidebarItems
                title={item.workspace.name}
                href={`/dashboard/${item.workspace.id}`}
                key={item.workspace.name}
                NameIcon={
                  <WorkspacePlaceholder>
                    {item.workspace.name.charAt(0)}
                  </WorkspacePlaceholder>
                }
                selected={pathName == `dashboard/${item.workspace.id}`}
              />
            ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      {workspace.subscription?.plan == "FREE" && (
        <GlobalCard
          title={"Upgrade to pro"}
          description={
            "Unlock AI feature like transcription, AI summary and more."
          }
        >
          <Button className="text-sm w-full mt-2">Ugrade</Button>
        </GlobalCard>
      )}
    </div>
  );
  return (
    <div className="w-[250px] ">
      <Infobar />
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant={"ghost"} className="mt-[2px]">
              <Menu></Menu>
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            {SideBar}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SideBar}</div>
    </div>
  );
};

export default Sidebar;
