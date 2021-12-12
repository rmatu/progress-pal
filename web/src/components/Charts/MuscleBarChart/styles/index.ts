import styled from "styled-components/macro";

export const Wrapper = styled.div<{ width: string }>`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  padding: 2em;
  max-width: ${({ width }) => `${width}px`};
  width: 100%;
  margin-left: 1em;
  border-radius: 0.5em;

  tspan {
    fill: #9b9b9b;
  }

  @media screen and (max-width: 1800px) {
    margin: 1em 0;
  }

  @media screen and (max-width: 764px) {
    height: 36em;
  }
`;
