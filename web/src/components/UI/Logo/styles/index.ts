import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const LogoWrapper = styled.div<{ width?: string; margin?: string }>`
  margin: ${({ margin }) => margin};
  padding: 0.1em;

  svg {
    max-width: ${convertPxToRem(181)};
    width: ${({ width }) => width};
  }
`;
