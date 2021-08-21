import React from "react";
import { FixedWrapper, LogoWrapper, NavWrapper } from "./styles";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import Hamburger from "../../UI/Hamburger/Hamburger";
import Menu from "../Menu/Menu";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <FixedWrapper>
      <LogoWrapper>
        <NavLink to={ROUTES.LANDING_PAGE}>
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
