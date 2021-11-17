import styled from "styled-components/macro";
import { convertPxToRem } from "../../../utils/cssHelpers";
import { motion } from "framer-motion";

export const WorkoutForm = styled(motion.form)``;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin: 0;
    border-radius: 0.5em;
    padding: 0.2em 0.5em;
    width: ${convertPxToRem(150)};
    margin: 0 0.4em;
    margin-right: 1em;
  }

  @media screen and (max-width: 476px) {
    flex-direction: column;
    margin-right: 0;
  }
`;

export const ExercisesList = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SuccessWorkoutWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15em;

  h2 {
    position: relative;
    top: ${convertPxToRem(20)};
  }

  .successfulWorkoutCreation {
    width: ${convertPxToRem(600)};
    height: ${convertPxToRem(395)};

    @media screen and (max-width: 810px) {
      margin-top: 2em;
      width: 90%;
      height: 90%;
    }
  }
`;

export const NoExercisesText = styled.p`
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  width: ${convertPxToRem(300)};
  text-align: center;
  margin: auto;
  margin-top: 1.5em;
  font-size: 2rem;
  opacity: 0.1;
`;

export const CalendarWrapper = styled.div`
  margin-left: 1em;
  position: relative;
  top: -0.2em;
  opacity: 0.7;
  transition: all 0.1s ease-in-out;

  :hover {
    opacity: 1;
    cursor: pointer;
  }

  svg {
    width: ${convertPxToRem(24)};
    height: ${convertPxToRem(24)};
  }
`;

export const DateH = styled.h4<{ margin?: string }>`
  margin: 0;
  opacity: 0.5;
  font-weight: normal;

  margin: ${({ margin }) => margin};
`;
