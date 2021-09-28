import styled from "styled-components/macro";

export const Wrapper = styled.div<{ open?: boolean }>`
  min-height: calc(100vh - 6em);
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  padding: 0 1em;

  @media screen and (min-width: 1024px) {
    top: 0;
  }
`;

export const RightContent = styled.div<{ open?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 1em 0 1em 1em;

  transition: all 0.75s ease-in-out;
  filter: ${({ open }) => open && "blur(4px)"};
`;

export const HeaderWrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 100;
`;
