import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../../utils/cssHelpers";

export const WorkoutCardWrapper = styled.div`
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

export const QuickInfoRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

export const RightCardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LeftCardContent = styled.div`
  width: ${convertPxToRem(150)};
  display: flex;
  flex-direction: column;
`;

export const ExerciseSVG = styled.div<{
  muscles?: string[];
}>`
  display: flex;
  flex-direction: row;
  padding: 0.5em 0;

  svg {
    height: ${convertPxToRem(150)};
    padding: 0.5em;
  }
`;
