import { convertPxToRem } from "./../../../../../../utils/cssHelpers";
import styled from "styled-components/macro";

export const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5em;

  svg {
    height: 16px;
    width: 16px;
    margin-right: 0.5em;
    opacity: 0.5;
    transition: all 0.1s ease-in-out;

    :hover {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

export const Wrapper = styled.form`
  input {
    :disabled {
      opacity: 0.4;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 180px;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;

  button {
    margin: 0;
    border-radius: 0.5em;
    padding: 0.2em 0.5em;
    width: ${convertPxToRem(100)};
    margin: 0 0.4em;
    opacity: 0.7;
  }
`;
