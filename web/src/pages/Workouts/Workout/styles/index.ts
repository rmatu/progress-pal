import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const ContentWrapper = styled.div`
  padding: 0 1em;
`;

export const Date = styled.h3`
  opacity: 0.5;
  margin: 0;
  font-weight: normal;
`;

export const WorkoutHeadingWrapper = styled.div<{ margin?: string }>`
  flex: 1 0 100%;
  margin: ${({ margin }) => margin};
`;

export const WorkoutHeading = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gray};
  max-width: fit-content;
  padding: 0.5em 0.5em 0.2em 0;
  margin-bottom: 0.5em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.graySeparator};
`;

export const ButtonsWrapper = styled.div<{ margin?: string }>`
  max-width: ${convertPxToRem(500)};
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 4em 0;
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
