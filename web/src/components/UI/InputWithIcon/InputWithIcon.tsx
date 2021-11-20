import React, { useRef } from "react";
import theme from "../../../theme/theme";
import { Error, Input, InputWrapper, SVGWrapper, Wrapper } from "./styles";

interface InputWithIconProps {
  bColor?: string;
  borderRadius?: string;
  disabled?: boolean;
  error?: string | undefined;
  iconComp?: React.ReactNode;
  id?: string;
  margin?: string;
  name: string;
  onChange: (e: any) => void;
  padding?: string;
  placeholder?: string;
  type: string;
  value: any;
  width?: string;
  wrapperWidth?: string;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  bColor = theme.colors.backgroundGray,
  borderRadius = "0.5em",
  disabled,
  error,
  iconComp,
  id,
  margin = "0.5em 0",
  name,
  onChange,
  padding = "0.4em 0.7em",
  placeholder,
  type,
  value,
  width = "fit-content",
  wrapperWidth = "fit-content",
}) => {
  const exerciseNameInputRef = useRef<HTMLInputElement>(null);

  const handlePencilClick = () => {
    if (!exerciseNameInputRef || !exerciseNameInputRef.current) return;

    exerciseNameInputRef.current.focus();
    exerciseNameInputRef.current.select();
  };

  return (
    <Wrapper>
      <InputWrapper
        margin={margin}
        backgroundColor={bColor}
        borderRadius={borderRadius}
        padding={padding}
        error={error}
        wrapperWidth={wrapperWidth}
      >
        <Input
          disabled={disabled}
          id={id}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          width={width}
          onChange={onChange}
          ref={exerciseNameInputRef}
        />
        <SVGWrapper onClick={handlePencilClick}>{iconComp}</SVGWrapper>
      </InputWrapper>
      <Error show={error}>{error}</Error>
    </Wrapper>
  );
};
export default InputWithIcon;
