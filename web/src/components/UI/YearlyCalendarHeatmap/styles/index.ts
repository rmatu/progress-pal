import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border-radius: 0.5em;
  padding: 0.5em;
  max-width: ${convertPxToRem(800)};
  height: ${convertPxToRem(150)};
`;

export const TrainingAmount = styled.div`
  position: absolute;
  bottom: 0.5em;
  left: 0.5em;
  display: flex;
  flex-direction: row;
`;

export const AmountText = styled.p`
  opacity: 0.5;
`;

export const Amount = styled.span`
  margin-left: 0.5em;
  opacity: 1;
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

export const Year = styled.p`
  margin-right: 0.6em;
`;
