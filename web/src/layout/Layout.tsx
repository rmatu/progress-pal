import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Navigation/Header/Header";
import { cleanUp } from "../redux/navbar/navbarActions";
import { AppState } from "../redux/rootReducer";
import { ContentWrapper, HeaderWrapper, ToCloseNavbar } from "./styles";

interface LayoutProps {
  children: React.ReactNode[] | React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const open = useSelector((state: AppState) => state.navbar.open);

  const handleCleanUp = () => {
    console.log("here");
    if (open) {
      dispatch(cleanUp());
    }
  };

  return (
    <ContentWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <ToCloseNavbar onClick={() => handleCleanUp()}>{children}</ToCloseNavbar>
    </ContentWrapper>
  );
};

export default Layout;
