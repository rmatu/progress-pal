import React from "react";
import { Wrapper, StyledButton } from "./styles";

interface ButtonProps {
  children: React.ReactNode[] | React.ReactNode;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children }) => {
  return (
    <Wrapper>
      <StyledButton>{children}</StyledButton>
    </Wrapper>
  );
};
export default Button;
