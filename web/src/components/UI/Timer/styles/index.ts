import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Time = styled.p`
  text-align: center;
  font-size: 1.4rem;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  button {
    border: none;
    margin: 0.3em;
    padding: 1em;
    width: auto;
    overflow: visible;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.backgroundGray};
    border-radius: 50%;
    transition: all 0.1s ease-in-out;

    /* inherit font & color from ancestor */
    color: inherit;
    font: inherit;

    line-height: normal;

    /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    -webkit-appearance: none;

    width: 50px;
    height: 50px;

    #play {
      height: 50px;
      width: 50px;
    }

    #pause {
      height: 20px;
      width: 20px;
    }
  }
`;

export const PauseButton = styled.button<{ paused: boolean }>`
  width: 60px !important;
  height: 60px !important;
  background: transparent;

  :hover {
    background-color: ${({ theme }) => theme.colors.errorTextColor};
  }

  background-color: ${({ paused, theme }) =>
    paused && theme.colors.errorTextColor};
`;

export const ResetButton = styled.button`
  background: transparent;
  :hover {
    background-color: ${({ theme }) => theme.colors.backgroundGray};
  }
`;

export const PlayButton = styled.button`
  background: transparent;
  :hover {
    background-color: ${({ theme }) => theme.colors.backgroundGray};
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin: 0;
    border-radius: 0.5em;
    padding: 0.2em 0.5em;
    width: ${convertPxToRem(150)};
    margin: 0 0.4em;
    margin-right: 1em;
  }

  @media screen and (max-width: 476px) {
    flex-direction: column;
    margin-right: 0;
  }
`;
