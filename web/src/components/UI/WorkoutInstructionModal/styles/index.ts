import styled, { css } from "styled-components/macro";
import theme from "../../../../theme/theme";
import { convertPxToRem } from "../../../../utils/cssHelpers";
import { createCSS } from "../../AddWorkoutModal/styles";

export const Instructions = styled.ul``;

export const Instruction = styled.li`
  list-style: decimal inside none;
  display: list-item;
  margin-left: 1em;
  opacity: 0.8;
  margin: 0.4em 1.5em;

  ::marker {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

export const InfoSVGWrapper = styled.div`
  margin-left: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.85;

  :hover {
    opacity: 1;
    cursor: pointer;
  }

  svg {
    width: ${convertPxToRem(14)};
    height: ${convertPxToRem(14)};
  }
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GridText = styled.p`
  margin-left: 0.3em;
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: 670px) {
    h4 {
      font-size: 1.3rem;
    }
  }
`;

export const GridValue = styled.div<{
  level?: string;
}>`
  font-size: 1.3rem;
  margin-left: 0.3em;

  ${({ level }) =>
    level &&
    level === "beginner" &&
    css`
      color: ${theme.colors.successTextColor};
    `}

  ${({ level }) =>
    level &&
    level === "intermediate" &&
    css`
      color: ${theme.colors.warningColor};
    `}

  ${({ level }) =>
    level &&
    level === "advanced" &&
    css`
      color: ${theme.colors.errorTextColor};
    `}

    @media screen and (max-width: 670px) {
    font-size: 1.2rem;
  }
`;

export const ExerciseSVG = styled.div<{
  muscles: string[];
  secondaryMuscles: string[];
  mobileCenter: boolean;
}>`
  display: flex;
  flex-direction: row;
  padding: 0.5em 0;
  margin-left: 1em;
  align-self: center;

  svg {
    height: 140px;
    width: 75px;
  }

  ${({ secondaryMuscles }) => {
    if (!secondaryMuscles || secondaryMuscles.length === 0) return;
    return createCSS(secondaryMuscles, theme.colors.modelSecondaryMuscles);
  }}

  ${({ muscles }) => {
    if (!muscles || muscles.length === 0) return;
    return createCSS(muscles, theme.colors.modelPrimaryMuslces);
  }}

  @media screen and (max-width: 670px) {
    margin: 1em 0;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1em;
  justify-content: center;

  @media screen and (max-width: 670px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
