import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const ModelWrapper = styled.div`
  display: flex;
  flex-direction: row;

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
