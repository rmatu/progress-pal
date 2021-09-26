import React from "react";
import { Wrapper, StyledButton } from "./styles";

interface ButtonProps {
  children: React.ReactNode[] | React.ReactNode;
  marginTop?: string;
  disabled?: boolean;
  padding?: string;
  fontSize?: string;
  // For future loader
  loading?: any;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  children,
  marginTop,
  disabled,
  padding,
  fontSize,
  loading,
  ...rest
}) => {
  return (
    <Wrapper marginTop={marginTop}>
      <StyledButton
        padding={padding}
        disabled={disabled}
        fontSize={fontSize}
        {...rest}
      >
        {loading ? loading : children}
      </StyledButton>
    </Wrapper>
  );
};
export default Button;
