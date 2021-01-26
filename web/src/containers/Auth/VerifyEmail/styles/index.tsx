import styled from "styled-components/macro";

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.backgroundDarkerGray};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 920px) {
    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.125rem;
    }

    button {
      padding: 0.8em 3em;
    }
  }
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

export const EmailIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 15em;
    width: 15em;
  }

  @media (max-width: 920px) {
    svg {
      height: 10em;
      width: 10em;
    }
  }
`;

export const StyledP = styled.p`
  text-align: center;
  font-size: 1.25rem;
  padding: 2em 1em;
`;

export const Content = styled.div`
  max-width: 40em;
`;

export const GoBack = styled.div`
  z-index: 10;
  position: absolute;
  height: 3em;
  width: 3em;
  top: 2em;
  right: 2em;

  @media (max-width: 920px) {
    height: 1.5em;
    width: 1.5em;
  }

  svg {
    fill: white;
  }
`;
