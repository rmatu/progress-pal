import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const Wrapper = styled.div<{ width: string }>`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  padding: 2em;
  max-width: ${({ width }) => `${width}px`};
  width: 100%;
  margin-left: 1em;
  border-radius: 0.5em;
  position: relative;
  min-height: 350px;

  tspan {
    fill: #9b9b9b;
  }

  @media screen and (max-width: 1800px) {
    margin: 1em 0 0 0;
  }

  @media screen and (max-width: 764px) {
    height: 36em;
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
  height: 100%;
`;
