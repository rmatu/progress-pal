import React from "react";
import { Wrapper, StyledButton } from "./styles";

interface ButtonProps {
  children: React.ReactNode[] | React.ReactNode;
  marginTop?: string;
  disabled?: boolean;
  padding?: string;
  bColor?: string;
  fontSize?: string;
  // For future loader
  loading?: any;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  children,
  bColor,
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
        bColor={bColor}
        {...rest}
      >
        {loading ? loading : children}
      </StyledButton>
    </Wrapper>
  );
};
export default Button;
