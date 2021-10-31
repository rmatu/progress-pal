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

export const ExerciseSVG = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5em 0;

  svg {
    margin-right: 1em;
    height: 90px;
  }

  > div :last-child {
    margin-right: 2em;
  }
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
