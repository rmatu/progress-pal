import React from "react";
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
}

const Select: React.FC<SelectProps> = ({
  bColor = theme.colors.backgroundGray,
  borderRadius = "0.5em",
  disabled,
  formik,
  handleSelectChange,
  name,
  options,
  padding = "0.7em 0.7em",
}) => {
  return (
    <Wrapper>
      <StyledSelect
        borderRadius={borderRadius}
        padding={padding}
        bColor={bColor}
        onChange={handleSelectChange || formik.handleChange}
        value={formik.values.bodyCategory}
        name={name}
        disabled={disabled}
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
