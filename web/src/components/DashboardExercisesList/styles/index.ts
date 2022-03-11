import styled from "styled-components/macro";
import { convertPxToRem } from "../../../utils/cssHelpers";

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border-radius: 0.5em;
  width: 100%;
  padding: 0.5em 4em;
  display: flex;
  flex-direction: column;
  gap: 0.25em;

  @media screen and (max-width: 1000px) {
    padding: 1em 2em;
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const WorkoutWrapper = styled.div`
  display: flex;
  transition: all 0.1s ease-in-out;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  align-items: center;

  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.modalBackground};
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }

  border-bottom: 1px solid ${({ theme }) => theme.colors.graySeparator};

  :last-of-type {
    border-bottom: none;
  }
`;

export const QuickInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1em;
  justify-content: flex-start;
  width: 100px;

  @media screen and (max-width: 1000px) {
    justify-content: center;
    margin-bottom: 0.5em;
  }
`;

export const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  opacity: 0.6;

  svg {
    margin-right: 0.7em;
    width: ${convertPxToRem(16)};
    height: ${convertPxToRem(16)};
    fill: white;
  }
`;

export const FirstColum = styled.div`
  margin-right: 5em;
  width: 180px;

  @media screen and (max-width: 1000px) {
    margin-right: 0;
    margin-bottom: 1em;
    text-align: center;
  }
`;
