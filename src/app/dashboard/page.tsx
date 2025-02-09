import React from "react";
import { onAuthenticateUser } from "@/actions/authentication";
import { redirect } from "next/navigation";
const page = async () => {
  const isAuth = await onAuthenticateUser();
  if (isAuth.status === 200 || isAuth.status === 201) {
    redirect(`/dashboard/${isAuth.user?.firstName}&${isAuth.user?.lastName}`);
  }
  if (
    isAuth.status === 400 ||
    isAuth.status === 401 ||
    isAuth.status === 500 ||
    isAuth.status === 404
  ) {
    redirect(`/signin`);
  }
};

export default page;
