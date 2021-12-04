import styled from "styled-components/macro";

export const Wrapper = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: ${({ width }) => width}px;
  width: 100%;

  h3 {
    margin-left: 2em;
  }
`;

export const LoaderWrapper = styled.div<{ width: number; height: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;
