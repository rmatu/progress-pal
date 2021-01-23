import React from "react";
import { Text, StyledSeparator } from "./styles";
import { ReactComponent as Stroke } from "../../../assets/svg/stroke.svg";

interface SeparatorProps {}

const Separator: React.FC<SeparatorProps> = () => {
  return (
    <StyledSeparator>
      <Stroke />
      <Text>OR</Text>
      <Stroke />
    </StyledSeparator>
  );
};
export default Separator;
