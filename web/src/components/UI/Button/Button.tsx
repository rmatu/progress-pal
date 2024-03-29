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
  justifyContent?: string;
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
  justifyContent,
  loading,
  ...rest
}) => {
  return (
    <Wrapper
      marginTop={marginTop}
      margin={margin}
      justifyContent={justifyContent}
    >
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
