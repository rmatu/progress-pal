import styled from "styled-components";
import { Form } from "formik";

export const StyledP = styled.p`
  width: 75%;
  text-align: center;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.grayText};
  margin-bottom: 2em;

  @media (max-width: 510px) {
    width: 85%;
  }
`;

export const StyledForm = styled(Form)`
  width: 85%;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .lockSvg {
    width: 5em;
    height: 5em;
    margin-bottom: 1em;
  }
`;
