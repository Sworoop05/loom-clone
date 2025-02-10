import React from "react";
import { onAuthenticateUser } from "@/actions/authentication";
import { redirect } from "next/navigation";
const page = async () => {
  // const isAuth = await onAuthenticateUser();
  // if (isAuth.status === 200 || isAuth.status === 201) {
  //   redirect(`/dashboard/${isAuth.user?.workspaces[0].id}`);
  // }
  // if (
  //   isAuth.status === 400 ||
  //   isAuth.status === 401 ||
  //   isAuth.status === 500 ||
  //   isAuth.status === 404
  // ) {
  //   redirect(`/signin`);
  // }
  return <div>this the dashboard</div>;
};

export default page;
