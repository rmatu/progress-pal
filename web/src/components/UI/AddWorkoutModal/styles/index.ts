import styled, { css } from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const TopSearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1em;

  button {
    margin-left: 1em;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    button {
      margin-top: 1em;
      margin-left: 0;
    }
  }

  @media screen and (max-width: 476px) {
    #searchInput {
      /* width: 100px; */
    }
  }
`;

export const ExercisesWrapper = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

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

  @media screen and (max-width: 768px) {
    max-height: 50vh;
  }
`;

export const Form = styled.form``;

export const AlphabetLetter = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  border-bottom: 1px solid #3f3f3f;
  margin-bottom: 0.5em;
  margin-right: 2em;
  padding-bottom: 0.25em;
`;

export const Exercise = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1em;
  transition: all 0.1s ease-in-out;
  border-radius: 0.5em;
  margin-right: 2em;
  position: relative;

  :hover {
    opacity: 0.8;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.backgroundGray};
  }

  #checkmark {
    display: none;
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    height: ${convertPxToRem(20)};
    width: ${convertPxToRem(20)};
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.colors.backgroundGray};
      opacity: 1;

      #checkmark {
        display: block;
      }

      :hover {
        opacity: 0.8;
        background-color: ${({ theme }) => theme.colors.backgroundGray};
      }
    `}
`;

export const ExerciseSVG = styled.div<{ muscles: string[] }>`
  display: flex;
  flex-direction: row;
  padding: 0.5em 0;

  svg {
    margin-right: 1em;
    height: 90px;
  }

  > svg:last-child {
    margin-right: 2em;
  }

  ${({ muscles }) => {
    if (!muscles) return;
    if (muscles.includes("trapezius")) {
      return css``;
    } else if (muscles.includes("upper-back")) {
      return css``;
    } else if (muscles.includes("lower-back")) {
      return css``;
    } else if (muscles.includes("chest")) {
      return css`
      polygon {
            &#chestLeft {
              fill: #db2f2f !important;
            }

            &#chestRight {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("biceps")) {
      return css``;
    } else if (muscles.includes("triceps")) {
      return css``;
    } else if (muscles.includes("forearm")) {
      return css``;
    } else if (muscles.includes("back-deltoids")) {
      return css``;
    } else if (muscles.includes("front-deltoids")) {
      return css``;
    } else if (muscles.includes("abs")) {
      return css``;
    } else if (muscles.includes("obliques")) {
      return css``;
    } else if (muscles.includes("adductor")) {
      return css``;
    } else if (muscles.includes("hamstring")) {
      return css``;
    } else if (muscles.includes("quadriceps")) {
      return css``;
    } else if (muscles.includes("abductors")) {
      return css``;
    } else if (muscles.includes("calves")) {
      return css``;
    } else if (muscles.includes("gluteal")) {
      return css``;
    } else if (muscles.includes("head")) {
      return css``;
    } else if (muscles.includes("neck")) {
      return css``;
    }
  }}
`;

export const ExerciseInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ExerciseName = styled.h3`
  margin: 0;
`;

export const ExercisePrimaryMuscle = styled.p`
  color: ${({ theme }) => theme.colors.gray};
`;

export const ExercisesAmmount = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 1em;
`;

export const NoExercises = styled.p`
  display: flex;
  overflow-wrap: break-word;
  word-break: break-all;
  justify-content: center;
  align-items: center;
  height: 6em;
  font-size: 2rem;
  font-weight: bold;
  margin: auto;

  @media screen and (max-width: 476px) {
    font-size: 1.6rem;
    flex-direction: column;
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20em;
`;
