import { onAuthenticateUser } from "@/actions/authentication";
import { redirect } from "next/navigation";

const CallbackPage = async () => {
  const { user, status } = await onAuthenticateUser();

  if (status == 400 || status == 401 || status == 500 || status == 404) {
    redirect("/signin");
  }

  try {
    const isAuth = await onAuthenticateUser();

    if (status === 200 || status === 201) {
      redirect(`/dashboard/${user?.clerkId}`);
    }

    redirect("/signin");
  } catch (error) {
    console.error("Authentication Error:", error);
    redirect("/signin");
  }
};

export default CallbackPage;
