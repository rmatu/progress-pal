import styled from "styled-components/macro";
import { convertPxToRem } from "../../utils/cssHelpers";

export const Wrapper = styled.div<{ open?: boolean }>`
  min-height: calc(100vh - 6em);
  min-height: 100vh;
  display: flex;
  flex-direction: row;

  @media screen and (min-width: 1024px) {
    top: 0;
  }
`;

export const HeaderWrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 100;
`;

export const RightContent = styled.div<{ open?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 1em 0 1em 1em;
  max-width: ${convertPxToRem(1600)};

  transition: all 0.75s ease-in-out;
  filter: ${({ open }) => open && "blur(4px)"};

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin: 0;
    padding: 1em;
  }
`;
