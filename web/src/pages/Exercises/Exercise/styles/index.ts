import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${convertPxToRem(40)};
    height: ${convertPxToRem(40)};
    opacity: 0.7;
    transition: all 0.1s ease-in-out;

    :hover {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5em;
  font-size: 1.125rem;
  opacity: 0.8;
  p {
    margin-right: 0.5em;
  }
`;
