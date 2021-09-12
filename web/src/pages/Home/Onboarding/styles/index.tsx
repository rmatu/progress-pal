import styled, { css } from "styled-components/macro";
import { Button } from "../../../../components/UI";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1em;
`;

export const CardWrapper = styled.div`
  max-width: ${convertPxToRem(600)};
  width: 100%;
`;

export const Progress = styled.div`
  background-color: #4f4b4b;
  max-width: ${convertPxToRem(600)};
  width: 100%;
  height: ${convertPxToRem(8)};
  border-radius: 1em 1em 0 0;
`;

export const ProgressBar = styled.div<{ progressWidth: string }>`
  height: ${convertPxToRem(8)};
  border-radius: ${({ progressWidth }) =>
    progressWidth !== "100%" ? "1em 0 0 0" : "1em 1em 0 0"};
  width: ${({ progressWidth }) => progressWidth};
  background-color: ${({ theme }) => theme.colors.orange};
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.modalBackground};
  padding: 1em;
  width: 100%;
  border-radius: 0 0 1em 1em;
`;

export const ButtonWrapper = styled.div`
  margin-top: 1em;
  width: ${convertPxToRem(450)};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 2em;

  @media screen and (max-width: 500px) {
    flex-direction: column-reverse;
    width: 100%;
  }
`;

export const NextButton = styled(Button)`
  @media screen and (max-width: 500px) {
    margin-bottom: 1em;
  }
`;

export const PrevButton = styled(Button)`
  background-color: transparent;
`;

export const Text = styled.p<{ margin?: string }>`
  text-align: center;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.grayText};
  margin: ${({ margin }) => margin};
`;

export const ChooseOption = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Option = styled.li<{ selected: boolean }>`
  position: relative;
  margin: 2em 0;
  border: 2px solid ${({ theme }) => theme.colors.gray};
  border-radius: 0.5em;
  padding: 1em;
  width: ${convertPxToRem(100)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all 0.1s ease-in-out;
  margin-right: 1em;

  :hover {
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.orange};
  }

  :last-of-type {
    margin-right: 0;
  }

  svg {
    width: ${convertPxToRem(60)};
    height: ${convertPxToRem(60)};
  }

  #checkmark {
    display: ${({ selected }) => (selected ? "normal" : "none")};
    width: ${convertPxToRem(16)};
    height: ${convertPxToRem(16)};
    position: absolute;
    top: 0.5em;
    right: 0.5em;
  }

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid ${({ theme }) => theme.colors.orange};
    `}
`;
