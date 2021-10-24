import styled from "styled-components/macro";
import ModalScroll from "../../ModalScroll/ModalScroll";

export const TopSearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1em;

  @media screen and (max-width: 476px) {
    #searchInput {
      width: 100px;
    }
  }
`;

export const Modal = styled(ModalScroll)``;

export const ExercisesWrapper = styled.div`
  max-height: 80vh;
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
`;

export const Form = styled.form``;

export const AlphabetLetter = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  margin-bottom: 0.5em;
  margin-right: 2em;
  padding-bottom: 0.25em;
`;

export const Exercise = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1em;
  transition: all 0.1s ease-in-out;
  border-radius: 0.5em;

  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.backgroundGray};
  }
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
