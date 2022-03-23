import React from "react";
import { FixedWrapper, LogoWrapper, NavWrapper } from "./styles";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import Hamburger from "../../UI/Hamburger/Hamburger";
import Menu from "../Menu/Menu";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";

interface HeaderProps {
  dashboardHeader?: boolean;
}

const Header: React.FC<HeaderProps> = ({ dashboardHeader }) => {
  if (dashboardHeader) {
    return (
      <FixedWrapper dashboardHeader={dashboardHeader}>
        <LogoWrapper>
          <NavLink to={ROUTES.MAIN_PAGE}>
            <Logo />
          </NavLink>
        </LogoWrapper>
        <NavWrapper>
          <Hamburger dashboardHeader={dashboardHeader} />
        </NavWrapper>
      </FixedWrapper>
    );
  }

  return (
    <FixedWrapper>
      <LogoWrapper>
        <NavLink to={ROUTES.MAIN_PAGE}>
          <Logo />
        </NavLink>
      </LogoWrapper>
      <NavWrapper>
        <Hamburger />
        <Menu />
      </NavWrapper>
    </FixedWrapper>
  );
};

export default Header;
