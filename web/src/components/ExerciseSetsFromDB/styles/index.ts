import styled, { css } from "styled-components/macro";
import { convertPxToRem } from "../../../utils/cssHelpers";

export const Wrapper = styled.div`
  padding: 1em;
  max-width: ${convertPxToRem(500)};
  width: 100%;
  position: relative;

  #cancelIcon {
    cursor: pointer;
    top: 1.6em;
    right: 1em;
    height: 10px;
    position: absolute;
    color: #fff;
    fill: #fff;
  }
`;

export const ExerciseName = styled.h3``;

export const PrimaryMuscles = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PrimaryMuscle = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  margin-right: 0.5em;
`;

export const Grid = styled.div`
  font-size: 1.115rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.5fr;
`;

export const GridItem = styled.div<{ svg?: boolean }>`
  padding: 0.5em 0;

  :nth-of-type(1) {
    justify-content: flex-start;
  }

  :nth-of-type(2) {
    justify-self: center;
  }

  :nth-of-type(3) {
    justify-self: flex-end;
  }

  :nth-of-type(4) {
    justify-self: flex-end;
    svg {
      transition: all 0.1s ease-in-out;
      opacity: 0.8;
      margin-top: 0.4em;
      width: ${convertPxToRem(16)};
      height: ${convertPxToRem(16)};

      :hover {
        cursor: pointer;
        opacity: 1;
      }
    }
  }
`;

export const SetNumber = styled.div`
  display: flex;
  font-weight: bold;
  justify-content: center;
  border-radius: 0.5em;
  padding: 0.2em 0.3;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  width: ${convertPxToRem(30)};
`;

export const Input = styled.input<{
  error?: boolean;
  readOnly?: boolean;
  tabIndex?: number;
}>`
  outline: none;
  border: none;
  color: white;
  display: flex;
  font-weight: bold;
  justify-content: center;
  border-radius: 0.5em;
  padding: 0.2em 1em;
  border: 1px solid ${({ theme }) => theme.colors.backgroundGray};
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  width: ${convertPxToRem(75)};
  text-align: right;

  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.errorTextColor};
    `}

  ${({ readOnly }) =>
    readOnly &&
    css`
      pointer-events: none;
    `}
`;

export const TrashIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  opacity: 0.7;
  transition: all 0.1s ease-in-out;

  :hover {
    opacity: 1;
  }
  svg {
    cursor: pointer;
    height: ${convertPxToRem(16)};
    width: ${convertPxToRem(16)};
  }
`;

export const EditButtonsWrapper = styled.div<{ margin?: string }>`
  display: flex;
  flex-direction: row;
  margin-top: 2em;
  margin: ${({ margin }) => margin};
  justify-content: center;

  button {
    margin: 0;
    border-radius: 0.5em;
    padding: 0.2em 0.5em;
    width: ${convertPxToRem(100)};
    margin: 0 0.4em;
    opacity: 0.7;
  }
`;
