import React from "react";
import { Wrapper, StyledButton } from "./styles";

interface ButtonProps {
  children: React.ReactNode[] | React.ReactNode;
  marginTop?: string;
  disabled?: boolean;
  padding?: string;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, marginTop, disabled, padding, ...rest }) => {
  return (
    <Wrapper marginTop={marginTop}>
      <StyledButton padding={padding} disabled={disabled} {...rest}>
        {children}
      </StyledButton>
    </Wrapper>
  );
};
export default Button;
