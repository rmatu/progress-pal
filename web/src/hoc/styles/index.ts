import styled from "styled-components/macro";

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
