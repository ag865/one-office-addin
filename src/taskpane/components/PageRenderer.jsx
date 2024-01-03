import React from "react";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { useAuth } from "../provider/AuthProvider";
import { FullPageLoader } from "./Loader";

const PageRenderer = () => {
  const { user, loadingUser } = useAuth();

  if (loadingUser) return <FullPageLoader />;

  if (!user) return <Login />;

  return <Home />;
};

export { PageRenderer };
