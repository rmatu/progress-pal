import styled from "styled-components/macro";

export const WorkoutForm = styled.form``;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
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
