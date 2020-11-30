import React from "react";
import Header from "../components/Navigation/Header/Header";

interface LayoutProps {
  children: React.ReactNode[] | React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
