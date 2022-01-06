import styled, { css } from "styled-components/macro";

export const Wrapper = styled.div<{ margin?: string }>`
  margin: ${({ margin }) => margin};
`;

interface SelectProps {
  borderRadius?: string;
  padding?: string;
  bColor?: string;
  margin?: string;
  width?: string;
}

export const StyledSelect = styled.select<SelectProps>`
  padding: ${({ padding }) => padding};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ bColor }) => bColor};
  border: none;
  color: white;

  ::-webkit-scrollbar {
    width: 8px;
    background: #0d141f;
    background-color: #0d141f;
    border-radius: 8px 8px 8px 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #525861;
    border-radius: 8px 8px 8px 8px;
  }

  ${({ width }) =>
    width &&
    css`
      width: 100%;
      width: ${width}
    }
  `}
`;

export const StyledOption = styled.option`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 27px;
  text-indent: 256px;
`;
