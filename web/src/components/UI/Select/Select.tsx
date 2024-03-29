import React from "react";
import { Heading } from "..";
import theme from "../../../theme/theme";
import { StyledSelect, StyledOption, Wrapper } from "./styles";

interface SelectProps {
  bColor?: string;
  borderRadius?: string;
  disabled?: boolean;
  formik: any;
  handleSelectChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  options: string[];
  padding?: string;
  title?: string;
  margin?: string;
  width?: string;
  value?: string;
}

const Select: React.FC<SelectProps> = ({
  bColor = theme.colors.backgroundGray,
  borderRadius = "0.5em",
  disabled,
  formik,
  handleSelectChange,
  name,
  title,
  options,
  padding = "0.7em 0.7em",
  margin,
  width,
  value,
}) => {
  return (
    <Wrapper margin={margin}>
      {title && (
        <Heading size="h4" textAlign="left" padding="0">
          {title}
        </Heading>
      )}
      <StyledSelect
        borderRadius={borderRadius}
        padding={padding}
        bColor={bColor}
        onChange={handleSelectChange || formik.handleChange}
        value={value || formik.values.bodyCategory}
        name={name}
        disabled={disabled}
        width={width}
      >
        {options.map(value => (
          <StyledOption key={value} value={value}>
            {value}
          </StyledOption>
        ))}
      </StyledSelect>
    </Wrapper>
  );
};
export default Select;
