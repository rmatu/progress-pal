import React from "react";
import { LogoWrapper } from "./styles";
import { ReactComponent as LogoSvg } from "../../../assets/svg/logo.svg";

interface LogoProps {
  width?: string;
  margin?: string;
}

const Logo: React.FC<LogoProps> = ({ width, margin }) => {
  return (
    <LogoWrapper width={width} margin={margin}>
      <LogoSvg />
    </LogoWrapper>
  );
};

export default Logo;
