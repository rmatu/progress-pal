import styled from "styled-components/macro";

export const WorkoutName = styled.input`
  all: unset;
  font-size: 1.125rem;
  color: white;
  transition: all 0.1s ease-in-out;

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-text-fill-color: white;
  }
`;

export const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5em;

  svg {
    cursor: pointer;
    height: 16px;
    width: 16px;
  }
`;

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
