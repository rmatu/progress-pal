import styled from "styled-components/macro";
import { convertPxToRem } from "../../../utils/cssHelpers";

export const PencilIconWrapper = styled.span`
  display: inline-block;
  margin-left: 16px;

  svg {
    transition: all 0.1s ease-in-out;
    opacity: 0.7;
    height: 16px;
    width: 16px;

    :hover {
      cursor: pointer;
      opacity: 1;
    }
  }
`;

export const DeleteButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4em;
  justify-content: center;

  button {
    margin: 0;
    border-radius: 0.5em;
    padding: 0.2em 0.5em;
    width: ${convertPxToRem(160)};
    margin: 0 0.4em;
    opacity: 0.7;
  }
`;
