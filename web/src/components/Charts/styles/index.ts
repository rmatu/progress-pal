import styled from "styled-components/macro";

export const Wrapper = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width}px;

  h3 {
    margin-left: 2em;
  }
`;
