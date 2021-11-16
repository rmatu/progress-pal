import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const TimeInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2em;

  input {
    margin: 0 0.5em;
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;

    input {
      margin: 0.5em 0;
    }
  }
`;

export const ButtonsWrapper = styled.div<{ margin?: string }>`
  max-width: ${convertPxToRem(500)};
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 2em 0 0 0;
  margin: ${({ margin }) => margin};
  justify-content: center;

  button {
    margin: 0;
    border-radius: 0.5em;
    padding: 0.2em 0.5em;
    width: ${convertPxToRem(150)};
    margin: 0 0.4em;
    opacity: 0.7;
  }
`;
