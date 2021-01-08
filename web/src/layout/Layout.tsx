import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Navigation/Header/Header";
import { cleanUp } from "../redux/navbar/navbarActions";
import { AppState } from "../redux/rootReducer";
import { HeaderWrapper, RestContent } from "./styles";

interface LayoutProps {
  children: React.ReactNode[] | React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { open, visible } = useSelector((state: AppState) => state.navbar);

  const handleCleanUp = () => {
    if (open) {
      dispatch(cleanUp());
    }
  };

  return (
    <>
      {visible ? (
        <>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <RestContent onClick={() => handleCleanUp()}>{children}</RestContent>
        </>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default Layout;
