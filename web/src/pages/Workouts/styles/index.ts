import styled from "styled-components/macro";
import { createCSS } from "../../../components/UI/AddWorkoutModal/styles";
import theme from "../../../theme/theme";
import { convertPxToRem } from "../../../utils/cssHelpers";

export const ContentWrapper = styled.div`
  padding: 0 1em;
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1em;

  @media screen and (max-width: 476px) {
    input {
      width: 180px;
    }
  }
`;

export const CalendarWrapper = styled.div`
  bottom: 0.5em;
  right: 0.5em;
  opacity: 0.5;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.3em 0 0 1em;

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

export const MonthAndYear = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gray};
  max-width: fit-content;
  padding: 0.5em 0.5em 0.2em 0;
  margin-bottom: 0.5em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.graySeparator};
`;

export const MonthAndYearWrapper = styled.div`
  flex: 1 0 100%;
`;

export const WorkoutsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 83vh;
  overflow-y: auto;

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

export const WorkoutWrapper = styled.div`
  max-width: ${convertPxToRem(350)};
  width: 100%;
  margin: 1em;

  :last-of-type {
    flex-basis: 100%;
  }
`;

export const WorkoutCard = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 0.5em;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  height: 200px;
  transition: all 0.1s ease-in-out;
  padding: 1em;
  position: relative;

  :hover {
    transform: scale(1.015);
    cursor: pointer;
  }
`;

export const WorkoutName = styled.h3`
  word-break: break-all;
  margin: 0;
`;

export const WorkoutDate = styled.p`
  opacity: 0.6;
`;

export const NoWorkoutsText = styled.p`
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  width: ${convertPxToRem(300)};
  margin: auto;
  text-align: center;
  margin-top: 1.5em;
  font-size: 2rem;
  opacity: 0.1;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
`;

export const QuickInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1em;
`;

export const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  opacity: 0.6;

  svg {
    margin-right: 0.7em;
    width: ${convertPxToRem(16)};
    height: ${convertPxToRem(16)};
    fill: white;
  }
`;

export const TrashIconWrapper = styled.div`
  opacity: 0.6;
  transition: all 0.1s ease-in-out;

  svg {
    position: absolute;
    top: 1em;
    right: 1em;
    width: ${convertPxToRem(16)};
    height: ${convertPxToRem(16)};
  }

  :hover {
    opacity: 1;
  }
`;

export const RightCardContent = styled.div``;

export const LeftCardContent = styled.div`
  width: ${convertPxToRem(150)};
`;

export const ExerciseSVG = styled.div<{
  muscles: string[];
}>`
  display: flex;
  flex-direction: row;
  padding: 0.5em 0;

  svg {
    height: ${convertPxToRem(150)};
    padding: 0.5em;
  }

  ${({ muscles }) => {
    if (!muscles || muscles.length === 0) return;
    return createCSS(muscles, theme.colors.modelPrimaryMuslces);
  }}
`;
