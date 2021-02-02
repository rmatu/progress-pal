import styled from "styled-components/macro";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  color: white;
  position: relative;

  @media (max-width: 920px) {
    flex-direction: column;
  }
`;

export const SignInChangeWrapper = styled.div`
  min-width: 35em;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 920px) {
    padding-top: 3em;
    height: 30em;
    min-width: 100%;

    background: rgb(45, 52, 54);
    background: linear-gradient(
      180deg,
      rgba(45, 52, 54, 1) 0%,
      rgba(0, 0, 0, 1) 100%
    );
  }
`;

export const SignInChangeContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2em;

  @media (max-width: 420px) {
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.2rem;
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

export const StyledP = styled.p`
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 1em;
  padding: 0 0.5em;
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundDarkerGray};
  width: 100%;

  #wave {
    display: none;
  }

  @media (max-width: 920px) {
    height: 100%;

    #wave {
      display: block;
    }
  }

  @media (min-width: 920px) {
    footer {
      position: absolute;
      bottom: 0;
    }
  }
`;

export const AuthContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1em;

  @media (max-width: 920px) {
    padding: 3em 0;
  }
`;

export const AuthText = styled.p`
  color: ${({ theme }) => theme.colors.grayText};
  font-size: 1.25rem;
`;

export const SocialIcons = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  svg {
    cursor: pointer;
    height: 4em;
    width: 4em;
    margin: 0 0.8em;
  }
`;

export const RegistrationForm = styled.div`
  max-width: 50em;

  @media (max-width: 1100px) {
    max-width: 35em;
  }

  @media (max-width: 420px) {
    max-width: 25em;
  }
`;

export const FieldWrapper = styled.div<{ active?: boolean }>`
  width: 24em;

  svg {
    fill: ${({ active }) => (active ? "#FE5000" : "#75757E")};

    transition: all 0.1s;
  }

  @media (max-width: 1100px) {
    width: 100%;
  }
`;

export const FieldRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;
