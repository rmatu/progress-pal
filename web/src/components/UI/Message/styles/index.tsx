import styled from "styled-components/macro";

interface Props {
  error?: boolean | null;
  success?: boolean | null;
  show?: string | boolean | null;
}

export const MessageWrapper = styled.div<Props>`
  font-size: 1rem;
  position: relative;
  color: ${({
    error,
    success,
    theme: {
      colors: { errorTextColor, successTextColor },
    },
  }) => {
    if (error) return errorTextColor;
    if (success) return successTextColor;
    else return "#fff";
  }};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transform: translateY(${({ show }) => (show ? "10px" : "0px")});
  background-size: contain;
  transition: all 0.2s;
  text-align: center;
`;
