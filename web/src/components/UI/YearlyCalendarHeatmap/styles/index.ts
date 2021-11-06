import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const Wrapper = styled.div<{ noData?: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: ${({ noData }) => noData && "center"};
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border-radius: 0.5em;
  padding: 0.5em 1em 0.5em 0.5em;
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

export const Years = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 60vh;
  overflow-y: auto;
  width: 100%;
`;

export const PickYear = styled.li`
  padding: 1em;
  cursor: pointer;
  font-size: 1.25rem;
  opacity: 0.5;

  :hover {
    opacity: 1;
  }
`;

export const HalfYearPicker = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0.3em;
  font-size: 1.25rem;
  opacity: 1;

  @media screen and (min-width: 592px) {
    display: none;
  }
`;

export const HalfYear = styled.div<{ selected?: boolean }>`
  opacity: ${({ selected }) => (selected ? "1" : "0.5")};
  cursor: pointer;

  :first-of-type {
    margin-right: 0.5em;
  }

  :last-of-type {
    margin-left: 0.5em;
  }
`;
