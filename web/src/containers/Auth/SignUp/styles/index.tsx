import styled from "styled-components/macro";

export const Wrapper = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  background-color: #615757;
  color: white;
  position: relative;
`;

export const SignInChange = styled.div`
  max-width: 27em;
  height: 100vh;
  background: rgb(45, 52, 54);
  background: linear-gradient(
    32deg,
    rgba(45, 52, 54, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
`;

export const GoBack = styled.div`
  z-index: 10;
  position: absolute;
  height: 3em;
  width: 3em;
  top: 2em;
  right: 2em;

  svg {
    fill: white;
  }
`;

export const StyledH1 = styled.h1`
  text-align: center;
  font-size: 2.375rem;
  margin-bottom: 1em;
`;

export const StyledP = styled.p`
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 1em;
`;
