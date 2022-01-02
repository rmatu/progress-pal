import styled from "styled-components/macro";
import { convertPxToRem } from "../../../utils/cssHelpers";

export const FormWrapper = styled.form``;

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

export const ModelWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border-radius: 0.5em;
  display: flex;
  gap: 0.5em;
  width: 400px;
  padding: 1.5em;
  position: relative;
`;

export const BottomContentWrapper = styled.div`
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
