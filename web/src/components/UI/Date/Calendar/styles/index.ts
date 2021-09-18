import styled, { css } from "styled-components/macro";

export const Wrapper = styled.div<{ position?: string }>`
  position: ${({ position }) => position};

  ${({ position }) =>
    position &&
    position === "absolute" &&
    css`
      z-index: 100;
    `}

  > div {
    padding: 1em;
  }

  @media screen and (max-width: 500px) {
    transform: scale(0.9);
    position: absolute;
    left: 0.5em;
  }
`;

export const CloseWrapper = styled.div`
  position: absolute;
  top: -0.2em;
  right: -0.2em;
  cursor: pointer;

  svg {
    width: 1em;
    height: 1em;
  }
`;
