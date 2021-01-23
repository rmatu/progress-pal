import React from "react";
import { Wrapper, StyledButton } from "./styles";

interface ButtonProps {
  children: React.ReactNode[] | React.ReactNode;
  marginTop?: string;
  disabled?: boolean;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, marginTop, disabled }) => {
  return (
    <Wrapper marginTop={marginTop}>
      <StyledButton disabled={disabled}>{children}</StyledButton>
    </Wrapper>
  );
};
export default Button;
