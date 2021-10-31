import styled from "styled-components/macro";

interface WrapperProps {
  marginTop?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  margin-top: ${({ marginTop }) => marginTop};
  display: flex;
  justify-content: center;
`;

interface ButtonProps {
  disabled?: boolean;
  padding?: string;
  fontSize?: string;
  bColor?: string;
  borderRadius?: string;
}

export const StyledButton = styled.button<ButtonProps>`
  color: #fff;
  user-select: none;
  outline: none;
  border: none;
  padding: ${({ padding }) => (padding ? padding : "0.9em 4.6em")};
  border-radius: 2em;
  border-radius: ${({ borderRadius }) => borderRadius};
  font-size: 1.2rem;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.orange};
  border: 3px solid ${({ theme }) => theme.colors.orange};
  background-color: ${({ bColor }) => bColor};
  border: ${({ bColor }) => bColor && `3px solid ${bColor}`};
  cursor: pointer;
  opacity: 90%;

  &:disabled {
    cursor: not-allowed;
    background-color: transparent;
    opacity: 80%;
  }

  &:hover {
    opacity: 100%;
  }

  transition: all 0.2s;
`;
