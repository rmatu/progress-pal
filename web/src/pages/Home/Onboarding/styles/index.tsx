import styled, { css } from "styled-components/macro";
import { Button } from "../../../../components/UI";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5em;
`;

export const LogoContainer = styled.div`
  margin-top: 1em;

  svg {
    height: 5em;
    width: 15em;
  }

  @media (max-width: 420px) {
    svg {
      height: 4.5em;
      width: 13em;
    }
  }
`;

export const GoBack = styled.div`
  height: 3em;
  width: 3em;
  margin: 1em 1em 0 0;

  @media (max-width: 600px) {
    height: 1.5em;
    width: 1.5em;
  }

  svg {
    fill: white;
  }
`;

export const Wrapper = styled.div`
  min-height: calc(100vh - 10em);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1em;
`;

export const CardWrapper = styled.div<{ margin?: string }>`
  max-width: ${convertPxToRem(600)};
  width: 100%;
  margin: ${({ margin }) => margin};
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
  margin: ${({ margin }) => margin};
`;

export const ChooseOption = styled.ul<{
  flexDirection?: string;
}>`
  display: flex;
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : "row"};
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 390px) {
    flex-wrap: wrap;
  }
`;

export const Option = styled.li<{
  selected: boolean;
  rowStyling?: boolean;
  center?: boolean;
}>`
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
  margin-right: 1em;

  :hover {
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.orange};
    transition: all 0.1s ease-in-out;
  }

  p,
  li {
    color: ${({ theme }) => theme.colors.grayText};
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
      font-color: #000;

      p,
      li {
        color: ${({ theme }) => theme.colors.white};
      }
    `}

  ${({ rowStyling }) =>
    rowStyling &&
    css`
      margin: 0.5em 0;
      width: ${convertPxToRem(400)};
      justify-content: flex-start;
      align-items: flex-start;

      p {
        text-align: left;
      }

      h4 {
        padding-left: 0;
        margin-bottom: 0.5em;
      }

      :first-of-type {
        margin-top: 2em;
      }

      @media screen and (max-width: 600px) {
        width: 100%;
      }
    `}

    ${({ center }) =>
    center &&
    css`
      display: flex;
      align-items: center;

      h4 {
        margin-bottom: 0;
      }
    `}

  @media screen and (max-width: 390px) {
    :last-of-type {
      margin-top: 0;
    }
  }
`;

export const BulletLi = styled.li`
  list-style-position: inside;
  list-style-type: disc;
`;

export const Form = styled.form`
  margin-top: 1em;
  width: 80%;
`;
