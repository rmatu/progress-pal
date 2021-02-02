import styled from "styled-components/macro";

interface WrappedModalProps {
  opened: boolean;
}

export const WrappedModal = styled.div<WrappedModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${({ opened }) =>
    opened ? "translate(-50%, -50%)" : "translate(-50%, -150%)"};
  z-index: 1500;
  width: 90%;
  max-width: 36em;
  display: flex;
  opacity: ${({ opened }) => (opened ? "1" : "0")};
  visibility: ${({ opened }) => (opened ? "visible" : "hidden")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.5em 3.5em var(--shadow);
  border-radius: 1em;
  padding: 3em 3em 4em 3em;
  background: ${({ theme }) => theme.colors.backgroundDarkerGray};
  transition: all 0.1s;
  color: white;

  .cancel {
    position: absolute;
    height: 1em;
    width: 1em;
    top: 1em;
    right: 1em;
    fill: #fff;

    :hover {
      cursor: pointer;
    }
  }

  @media (max-width: 510px) {
    padding: 3em 1.5em 3em 1.5em;
  }
`;
