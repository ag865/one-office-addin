import React from "react";
import PropTypes from "prop-types";
import { Header } from "./Header";

const MainLayout = ({ children }) => {
  return (
    <div className="max-h-screen min-h-screen overflow-y-scroll bg-white flex flex-col">
      <Header />
      {children}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export { MainLayout };
