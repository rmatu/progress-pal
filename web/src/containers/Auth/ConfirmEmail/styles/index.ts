import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundDarkerGray};
  color: white;
  padding: 1em;
`;

export const LogoContainer = styled.div`
  z-index: 10;
  position: absolute;
  top: 0.8em;
  left: 2em;

  svg {
    height: 5em;
    width: 15em;
  }

  @media (max-width: 420px) {
    top: 1em;
    left: 1em;
    svg {
      height: 4.5em;
      width: 13em;
    }
  }
`;
