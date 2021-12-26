import styled from "styled-components/macro";
import { convertPxToRem } from "../../../utils/cssHelpers";

export const ContentWrapper = styled.div`
  padding: 0 1em;

  @media screen and (max-width: 764px) {
    padding: 0;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1em;

  @media screen and (max-width: 476px) {
    input {
      width: 180px;
    }
  }
`;

export const CalendarWrapper = styled.div`
  bottom: 0.5em;
  right: 0.5em;
  opacity: 0.5;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.3em 0 0 1em;

  :hover {
    cursor: pointer;
    opacity: 1;
  }

  svg {
    width: ${convertPxToRem(30)};
    height: ${convertPxToRem(30)};
    color: white;
    fill: white;
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
`;
