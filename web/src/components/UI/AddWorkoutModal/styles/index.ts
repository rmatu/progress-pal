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

function createCSS(muscles: string[], color: string) {
  let styles = "";

  for (let i = 0; i < muscles.length; i += 1) {
    styles += `
        polygon {
          &.${muscles[i]} {
            fill: ${color} !important;
          }
        }
     `;
  }

  return css`
    ${styles}
  `;
}

export const ExerciseSVG = styled.div<{
  muscles: string[];
  secondaryMuscles: string[];
}>`
  display: flex;
  flex-direction: row;
  padding: 0.5em 0;

  svg {
    margin-right: 1em;
    height: 120px;
  }

  > svg:last-child {
    margin-right: 2em;
  }

  ${({ secondaryMuscles }) => {
    if (!secondaryMuscles || secondaryMuscles.length === 0) return;
    return createCSS(secondaryMuscles, "#d69b47");
  }}

  ${({ muscles }) => {
    if (!muscles || muscles.length === 0) return;
    return createCSS(muscles, "#db2f2f");
  }} /* ${({ secondaryMuscles }) => {
    if (!secondaryMuscles || secondaryMuscles.length === 0) return;
    if (secondaryMuscles.includes("trapezius")) {
      return css`
      polygon {
            &.trapezius {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("upper-back")) {
      return css`
      polygon {
            &.upper-back {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("lower-back")) {
      return css`
      polygon {
            &.lower-back {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("chest")) {
      return css`
      polygon {
            &.chest {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("biceps")) {
      return css`
      polygon {
            &.biceps {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("triceps")) {
      return css`
      polygon {
            &.triceps {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("forearm")) {
      return css`
      polygon {
            &.forearm {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("back-deltoids")) {
      return css`
      polygon {
            &.back-deltoids {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("front-deltoids")) {
      return css`
      polygon {
            &.front-deltoids {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("abs")) {
      return css`
      polygon {
            &.abs {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("obliques")) {
      return css`
      polygon {
            &.obliques {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("adductor")) {
      return css`
      polygon {
            &.adductor {
              fill: #d69b47!important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("hamstring")) {
      return css`
      polygon {
            &.hamstring {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("quadriceps")) {
      return css`
      polygon {
            &.quadriceps {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("abductors")) {
      return css`
      polygon {
            &.abductors {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("calves")) {
      return css`
      polygon {
            &.calves {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("gluteal")) {
      return css`
      polygon {
            &.gluteal {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("head")) {
      return css`
      polygon {
            &.head {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    } else if (secondaryMuscles.includes("neck")) {
      return css`
      polygon {
            &.neck {
              fill: #d69b47 !important;
            }
          }
        } 
      `;
    }
  }}

  ${({ muscles }) => {
    if (!muscles || muscles.length === 0) return;
    if (muscles.includes("trapezius")) {
      return css`
      polygon {
            &.trapezius {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("upper-back")) {
      return css`
      polygon {
            &.upper-back {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("lower-back")) {
      return css`
      polygon {
            &.lower-back {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("chest")) {
      return css`
      polygon {
            &.chest {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("biceps")) {
      return css`
      polygon {
            &.biceps {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("triceps")) {
      return css`
      polygon {
            &.triceps {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("forearm")) {
      return css`
      polygon {
            &.forearm {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("back-deltoids")) {
      return css`
      polygon {
            &.back-deltoids {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("front-deltoids")) {
      return css`
      polygon {
            &.front-deltoids {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("abs")) {
      return css`
      polygon {
            &.abs {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("obliques")) {
      return css`
      polygon {
            &.obliques {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("adductor")) {
      return css`
      polygon {
            &.adductor {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("hamstring")) {
      return css`
      polygon {
            &.hamstring {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("quadriceps")) {
      return css`
      polygon {
            &.quadriceps {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("abductors")) {
      return css`
      polygon {
            &.abductors {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("calves")) {
      return css`
      polygon {
            &.calves {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("gluteal")) {
      return css`
      polygon {
            &.gluteal {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("head")) {
      return css`
      polygon {
            &.head {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    } else if (muscles.includes("neck")) {
      return css`
      polygon {
            &.neck {
              fill: #db2f2f !important;
            }
          }
        } 
      `;
    }
  }} */
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

export const Circle = styled.div<{ color: string }>`
  width: ${convertPxToRem(10)};
  height: ${convertPxToRem(10)};

  background-color: ${({ color }) => color};

  border-radius: 50%;
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1em;
`;

export const LegendText = styled.p`
  margin: 0 0.5em;
`;
