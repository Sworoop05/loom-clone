"use server";
import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import {
  verifyWorkspaceAccess,
  getWorkspaceFolders,
  getAllUserVideos,
  getWorkspaces,
} from "@/actions/workspace";
import { getNotification } from "@/actions/notification";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Sidebar from "@/components/global/sidebar";
import { error, WorkspaceProp } from "@/types/index.type";
import GlobalHeader from "@/components/global/Global-Header";

type Props = { children: React.ReactNode; params: { workspace: string } };

const layout = async ({ children, params }: Props) => {
  const { workspace } = await params;
  const auth = await onAuthenticateUser();
  if (!auth.user?.workspaces || !auth.user.workspaces.length)
    return redirect("/signin");
  console.log(workspace);
  const hasAccess = await verifyWorkspaceAccess(workspace);
  if ([401, 500].includes(auth.status)) return redirect(`/dashboard`);
  console.log(hasAccess);
  if (!hasAccess.data) return null;
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspace),
  });
  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspace),
  });
  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotification(),
  });
  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkspaces(),
  });
  const workspaceData: WorkspaceProp = await query.fetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkspaces(),
  });
  console.log(`this is fetched workspace data`, workspaceData);
  return (
    <div>
      <HydrationBoundary state={dehydrate(query)}>
        <div className="flex  w-full  ">
          <Sidebar activeWorkspaceId={workspace} initialData={workspaceData} />
          <div className="w-full pt-28 p-10  overflow-x-hidden">
            <GlobalHeader workspace={hasAccess.data} />
            <div className="mt-4 w-full">{children}</div>
          </div>
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default layout;
