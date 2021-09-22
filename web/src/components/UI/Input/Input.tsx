import React from "react";
import { StyledInput, IconWrapper, Wrapper, Error } from "./styles";

interface InputProps {
  field: any;
  form: any;
  width?: string;
  borderRadius?: string;
}

const Input: React.FC<InputProps> = ({
  field,
  form: { touched, errors },
  width,
  borderRadius,
  children,
  ...props
}) => {
  return (
    <Wrapper width={width} borderRadius={borderRadius}>
      <StyledInput {...field} {...props} />
      <IconWrapper>{children}</IconWrapper>
      <Error show={errors[field.name] && touched[field.name]}>
        {errors[field.name]}
      </Error>
    </Wrapper>
  );
};

export default Input;
