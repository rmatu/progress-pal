import styled, { css } from "styled-components/macro";
import theme from "../../../../theme/theme";

interface WrapperProps {
  bColor?: string;
  borderRadius?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  margin-bottom: 1em;
`;

export const Input = styled.input<{ width?: string }>`
  all: unset;
  display: flex;
  font-size: 1.125rem;
  color: white;
  transition: all 0.1s ease-in-out;
  width: ${({ width }) => width};

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-text-fill-color: white;
  }
`;

interface InputWrapperProps {
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  borderRadius?: string;
  error?: string;
  wrapperWidth?: string;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid ${({ backgroundColor }) => backgroundColor};
  width: ${({ wrapperWidth }) => wrapperWidth};

  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${theme.colors.errorTextColor};
    `};
`;

export const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5em;

  svg {
    cursor: pointer;
    height: 16px;
    width: 16px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin-right: 1em;
  }

  @media screen and (max-width: 476px) {
    flex-direction: column;
    margin-right: 0;
  }
`;

interface ErrorProps {
  show: string | undefined;
}

export const Error = styled.div<ErrorProps>`
  color: #ff5757;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transform: translateY(${({ show }) => (show ? "14px" : "-4px")});
  transition: all 0.1s;
  position: absolute;
  bottom: 0;
  left: 0;
  font-weight: 700;
  font-size: 1rem;
`;
