import styled from "styled-components/macro";
import { convertPxToRem } from "../../../utils/cssHelpers";

export const Wrapper = styled.div`
  padding: 1em;
  max-width: ${convertPxToRem(400)};
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
  grid-template-columns: 1fr 1fr 1fr 0.3fr;
`;

export const GridItem = styled.div`
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

export const Input = styled.input`
  outline: none;
  border: none;
  color: white;
  display: flex;
  font-weight: bold;
  justify-content: center;
  border-radius: 0.5em;
  padding: 0.2em 1em;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  width: ${convertPxToRem(75)};

  text-align: right;
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
