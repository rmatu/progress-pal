import React from "react";
import { Wrapper, StyledButton } from "./styles";

interface ButtonProps {
  children: React.ReactNode[] | React.ReactNode;
  marginTop?: string;
  margin?: string;
  disabled?: boolean;
  padding?: string;
  bColor?: string;
  fontSize?: string;
  borderRadius?: string;
  // For future loader
  loading?: any;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  children,
  bColor,
  borderRadius,
  marginTop,
  margin,
  disabled,
  padding,
  fontSize,
  loading,
  ...rest
}) => {
  return (
    <Wrapper marginTop={marginTop} margin={margin}>
      <StyledButton
        padding={padding}
        disabled={disabled}
        fontSize={fontSize}
        bColor={bColor}
        borderRadius={borderRadius}
        {...rest}
      >
        {loading ? loading : children}
      </StyledButton>
    </Wrapper>
  );
};
export default Button;
