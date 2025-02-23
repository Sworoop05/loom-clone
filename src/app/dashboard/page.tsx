"use server";
import React from "react";
import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const Page = async () => {
  const isAuth = await onAuthenticateUser();

  if (!isAuth || !isAuth.user) return <div>{isAuth.message}</div>;

  if (
    isAuth.status === 400 ||
    isAuth.status === 401 ||
    isAuth.status === 500 ||
    isAuth.status === 404
  ) {
    redirect(`/signin`);
  }

  // If authenticated and has workspaces, redirect to first workspace
  if (isAuth.user.workspaces?.length) {
    redirect(`/dashboard/${isAuth.user.workspaces[0].id}`);
  }

  return <div>this is the dashboard</div>;
};

export default Page;
