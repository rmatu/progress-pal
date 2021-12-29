import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border-radius: 0.5em;
  max-width: 701px;
  width: 100%;
  padding: 0.5em 2em;
  position: relative;
  padding-bottom: 4em;

  tspan {
    fill: #9b9b9b;
  }
`;

export const IconsWrapper = styled.div`
  position: absolute;
  top: 1em;
  right: 0;
  display: flex;
  flex-direction: row;

  svg {
    transition: all 0.1s ease-in-out;
    opacity: 0.5;
    margin-right: 0.5em;
    cursor: pointer;
    width: ${convertPxToRem(20)};
    height: ${convertPxToRem(20)};

    :hover {
      opacity: 1;
    }
  }
`;

export const CalendarWrapper = styled.div`
  position: absolute;
  bottom: 0.5em;
  right: 0.5em;
  opacity: 0.5;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: center;

  :hover {
    cursor: pointer;
    opacity: 1;
  }

  svg {
    width: ${convertPxToRem(30)};
    height: ${convertPxToRem(30)};
    color: white;
    fill: white;
  }
`;

export const Text = styled.p`
  margin-right: 1em;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1em;
  justify-content: center;

  button {
    margin: 0;
    border-radius: 0.5em;
    padding: 0.2em 0.5em;
    width: ${convertPxToRem(100)};
    margin: 0 0.4em;
    opacity: 0.7;
  }
`;

export const ModalContent = styled.form``;

export const WeightRowWrapper = styled.div`
  max-height: 600px;
  overflow-y: auto;
  margin-top: 1em;

  ::-webkit-scrollbar {
    width: 8px;
    background: #0d141f;
    background-color: #0d141f;
    border-radius: 8px 8px 8px 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #525861;
    border-radius: 8px 8px 8px 8px;
  }
`;
