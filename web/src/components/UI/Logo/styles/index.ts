import styled from "styled-components/macro";

export const LogoWrapper = styled.div<{ width?: string; margin?: string }>`
  margin: ${({ margin }) => margin};
  padding: 0.1em;

  svg {
    width: ${({ width }) => width};
  }
`;
