import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const ModelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5em;

  svg {
    padding: 0 0.5em;
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${convertPxToRem(300)};
  height: ${convertPxToRem(258)};
`;

export const Text = styled.p`
  opacity: 0.5;
  margin-top: 0.5em;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  border-radius: 0.5em;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  width: ${convertPxToRem(300)};
`;

export const CalendarWrapper = styled.div`
  bottom: 0.5em;
  right: 0.5em;
  opacity: 0.5;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: center;

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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
