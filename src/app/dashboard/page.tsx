"use server";
import React from "react";
import { onAuthenticateUser } from "@/actions/authentication";
import { redirect } from "next/navigation";
import { SignIn, SignInButton } from "@clerk/nextjs";
const Page = async () => {
  const isAuth = await onAuthenticateUser();
  console.log("control reache here", isAuth);
  if (!isAuth || !isAuth.user) return <div>{isAuth.message}</div>;

  if (isAuth.status === 200 || isAuth.status === 201) {
    redirect(`/dashboard/${isAuth.user?.workspaces[0].id}`);
  }
  if (
    isAuth.status === 400 ||
    isAuth.status === 401 ||
    isAuth.status === 500 ||
    isAuth.status === 404
  ) {
    redirect(`/signin`);
  }
  return <div>this the dashboard</div>;
};

export default Page;
