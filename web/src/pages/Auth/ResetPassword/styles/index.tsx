import styled from "styled-components/macro";
import { Form } from "formik";

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 0 1em;
  background-color: ${({ theme }) => theme.colors.backgroundDarkerGray};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  @media (max-width: 600px) {
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

  footer {
    position: absolute;
    bottom: 0;
    padding-bottom: 0.5em;
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

  @media (max-width: 600px) {
    height: 1.5em;
    width: 1.5em;
  }

  svg {
    fill: white;
  }
`;

export const StyledP = styled.p`
  text-align: center;
  font-size: 1.125rem;
  padding: 1em 2em;
  color: ${({ theme }) => theme.colors.grayText};

  @media (min-width: 600px) {
    padding: 2em 4em;
  }

  @media (max-width: 500px) {
    margin-bottom: 2em;
  }
`;

export const Content = styled.div`
  border-radius: 2em;
  max-width: 40em;
  padding: 3em 1em 8em 1em;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;

  background-color: #161616;
  -webkit-box-shadow: 0px 3px 19px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 3px 19px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 3px 19px 0px rgba(0, 0, 0, 0.5);

  .lockSvg {
    width: 10em;
    height: 10em;
  }

  @media (max-width: 600px) {
    .lockSvg {
      width: 7em;
      height: 7em;
    }
  }
`;

export const ExpirationText = styled.p`
  margin-top: 2em;
  text-align: center;
  color: #a09e9e;

  position: absolute;
  bottom: 1em;

  span {
    color: ${({ theme }) => theme.colors.orange};
  }
`;

export const StyledForm = styled(Form)`
  width: 85%;
`;

export const FieldWrapper = styled.div<{ active?: boolean }>`
  width: 100%;
  svg {
    fill: ${({ active }) => (active ? "#FE5000" : "#75757E")};

    transition: all 0.1s;
  }
  @media (max-width: 1100px) {
    width: 100%;
  }
`;
