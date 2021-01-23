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
}

export const StyledButton = styled.button<ButtonProps>`
  color: #fff;
  user-select: none;
  outline: none;
  border: none;
  padding: 0.9em 4.6em;
  border-radius: 2em;
  font-size: 1.2rem;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.orange};
  border: 3px solid ${({ theme }) => theme.colors.orange};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background-color: transparent;
    opacity: 80%;
  }

  transition: all 0.2s;
`;
