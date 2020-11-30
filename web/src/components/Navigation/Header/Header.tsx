import React from "react";
import { FixedWrapper, LogoText, NavWrapper } from "./styles";
import Hamburger from "../../UI/Hamburger/Hamburger";
import Menu from "../Menu/Menu";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <FixedWrapper>
      <LogoText>ProgressPal</LogoText>
      <NavWrapper>
        <Hamburger />
        <Menu />
      </NavWrapper>
    </FixedWrapper>
  );
};

export default Header;
