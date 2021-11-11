import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const MonthAndYear = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gray};
  max-width: fit-content;
  padding: 0.5em 0.5em 0.2em 0;
  margin-bottom: 0.5em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.graySeparator};
`;

export const MonthAndYearWrapper = styled.div`
  flex: 1 0 100%;
`;

export const WorkoutsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 83vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
    background: #0d141f;
    background-color: #0d141f;
    border-radius: 8px 8px 8px 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #525861;
    border-radius: 8px 8px 8px 8px;
  }
`;

export const WorkoutWrapper = styled.div`
  max-width: ${convertPxToRem(350)};
  width: 100%;
  margin: 1em;

  :last-of-type {
    flex-basis: 100%;
  }
`;

export const NoWorkoutsText = styled.p`
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  width: ${convertPxToRem(300)};
  margin: auto;
  text-align: center;
  margin-top: 1.5em;
  font-size: 2rem;
  opacity: 0.1;
`;
