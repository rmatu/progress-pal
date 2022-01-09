import styled from "styled-components/macro";
import { convertPxToRem } from "../../../utils/cssHelpers";

export const FormWrapper = styled.form`
  position: relative;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1em;
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

export const AddInstructionButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1em;
  width: 100%;
  justify-content: center;

  button {
    margin: 0;
    border-radius: 0.5em;
    padding: 0.2em 0.5em;
    width: ${convertPxToRem(200)};
    margin: 0 0.4em;
    opacity: 0.7;
  }
`;

export const ModelWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border-radius: 0.5em;
  display: flex;
  gap: 0.5em;
  max-width: 400px;
  width: 100%;
  padding: 1.5em;
  position: relative;
`;

export const BottomContentWrapper = styled.div`
  max-width: 400px;
  max-width: 400px;
  width: 100%;
`;

export const RadioInput = styled.input`
  margin: 0;
`;

export const Rectangle = styled.div<{ color: string }>`
  width: ${convertPxToRem(10)};
  height: ${convertPxToRem(10)};

  background-color: ${({ color }) => color};

  border-radius: 10%;
  margin-right: 2em;
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5em;
`;

export const LegendText = styled.p`
  margin: 0 0.5em;
`;

export const ResetIconWrapper = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;

  svg {
    transition: all 0.1s ease-in-out;
    opacity: 0.5;
    height: 24px;
    width: 24px;

    :hover {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

export const StepNumber = styled.div`
  display: flex;
  font-weight: bold;
  justify-content: center;
  border-radius: 0.5em;
  padding: 0.2em 0.3;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  width: ${convertPxToRem(30)};
`;

export const OptionalSpan = styled.span`
  opacity: 0.5;
  font-size: 1rem;
`;

export const Grid = styled.div`
  font-size: 1.115rem;
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  gap: 0.5em;
`;

export const GridItem = styled.div`
  padding: 0.5em 0;
  display: flex;
  align-items: center;
  justify-content: center;

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

  textarea {
    width: 100%;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 10px;
    color: white;
    background-color: ${({ theme }) => theme.colors.backgroundGray};
    padding: 1.2em;
    height: auto;
  }
`;

export const TextArea = styled.textarea`
  display: flex;
  justify-content: center;
  border-radius: 0.5em;
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  color: white;
  width: 350px;
  resize: vertical;

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

  ::-webkit-resizer {
    background-color: ${({ theme }) => theme.colors.backgroundGray};
  }

  @media screen and (max-width: 768px) {
    width: 315px;
  }
`;

export const PlusIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    transition: all 0.1s ease-in-out;
    opacity: 0.6;
    height: 20px;
    width: 20px;

    :hover {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

export const TrashIconWrapper = styled.div`
  align-self: flex-start;

  svg {
    transition: all 0.1s ease-in-out;
    opacity: 0.6;
    height: 16px;
    width: 16px;

    :hover {
      opacity: 1;
      cursor: pointer;
    }
  }
`;
