import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledButton = styled.button`
  color: #fff;
  user-select: none;
  outline: none;
  border: none;
  padding: 1em 5em;
  border-radius: 2em;
  font-size: 1.2rem;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.orange};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background-color: #333;
  }
`;
