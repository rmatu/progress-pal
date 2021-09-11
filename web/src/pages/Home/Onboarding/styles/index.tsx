import styled from "styled-components/macro";
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
`;

export const ButtonWrapper = styled.div`
  margin-top: 1em;
  width: ${convertPxToRem(450)};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const NextButton = styled(Button)``;

export const PrevButton = styled(Button)`
  background-color: transparent;
`;
