"use server";
import { onAuthenticateUser } from "@/actions/authentication";
import { redirect } from "next/navigation";
import React from "react";
import {
  verifyWorkspaceAccess,
  getWorkspaceFolders,
  getAllUserVideos,
} from "@/actions/workspace";
import { getNotification } from "@/actions/notification";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Sidebar from "@/components/global/sidebar";

type Props = { children: React.ReactNode; params: { workspaceId: string } };

const layout = async ({ children, params }: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth.user?.workspaces || !auth.user.workspaces.length)
    return redirect("/signin");
  const hasAccess = await verifyWorkspaceAccess(params.workspaceId);
  if (hasAccess.status != 200)
    return redirect(`/dashboard/${auth.user.workspaces[0].id}`);
  if (!hasAccess.data) return null;
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(params.workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(params.workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotification(),
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-full">
        <Sidebar activeWorkspaceId={params.workspaceId} />
      </div>
    </HydrationBoundary>
  );
};

export default layout;
