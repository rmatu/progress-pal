import React from "react";
import theme from "../../../theme/theme";
import { StyledSelect, StyledOption, Wrapper } from "./styles";

interface SelectProps {
  borderRadius?: string;
  padding?: string;
  bColor?: string;
  options: string[];
  formik: any;
  name: string;
  handleSelectChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  borderRadius = "0.5em",
  padding = "0.7em 0.7em",
  handleSelectChange,
  bColor = theme.colors.backgroundGray,
  options,
  formik,
  name,
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
