import React from "react";
import { FixedWrapper, LogoWrapper, NavWrapper } from "./styles";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import Hamburger from "../../UI/Hamburger/Hamburger";
import Menu from "../Menu/Menu";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <FixedWrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <NavWrapper>
        <Hamburger />
        <Menu />
      </NavWrapper>
    </FixedWrapper>
  );
};

export default Header;
