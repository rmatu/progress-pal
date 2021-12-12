import styled, { css } from "styled-components/macro";
import { convertPxToRem } from "../../../../../utils/cssHelpers";

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
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
  dashboardLayout?: boolean;
}>`
  display: flex;
  flex-direction: row;
  padding: 0.5em 0;

  svg {
    width: ${convertPxToRem(80)};
    padding: 0.5em;

    ${({ dashboardLayout }) =>
      dashboardLayout &&
      css`
        width: ${convertPxToRem(110)};
      `}
  }
`;

export const WorkoutCardWrapper = styled.div<{
  dashboardLayout?: boolean;
  loader?: boolean;
}>`
  display: flex;
  flex-direction: column;
  border-radius: 0.5em;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  height: 200px;
  transition: all 0.1s ease-in-out;
  padding: 1em;
  position: relative;
  max-width: ${convertPxToRem(358)};
  width: 100%;

  :hover {
    transform: scale(1.015);
    cursor: pointer;
  }

  ${({ dashboardLayout }) =>
    dashboardLayout &&
    css`
      height: ${convertPxToRem(300)};
      max-width: ${convertPxToRem(400)};

      ${LeftCardContent} {
        margin-top: 2em;
      }
    `}

  ${({ dashboardLayout, loader }) =>
    dashboardLayout &&
    loader &&
    css`
      align-items: center;
      justify-content: center;
    `}

  @media screen and (max-width: 764px) {
    ${({ dashboardLayout }) =>
      !dashboardLayout &&
      css`
        height: 170px;
      `}
  }
`;
