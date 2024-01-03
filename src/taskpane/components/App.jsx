import * as React from "react";

import { MainLayout } from "./MainLayout";
import { AuthProvider } from "../provider/AuthProvider";
import { PageRenderer } from "./PageRenderer";
import "./../../index.css";

const App = () => {
  return (
    <AuthProvider>
      <MainLayout>
        <PageRenderer />
      </MainLayout>
    </AuthProvider>
  );
};

export default App;
