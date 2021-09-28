import styled from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const Wrapper = styled.div<{ open?: boolean }>`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  padding: 0 1em;
`;

export const LeftNavbar = styled.nav`
  padding-right: 1em;
  width: 15%;
  max-width: ${convertPxToRem(200)};
  max-height: calc(100vh - 2em);
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.gray};

  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
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

export const Row = styled.div`
  width: 100%;
`;

export const Avatar = styled.div`
  width: ${convertPxToRem(80)};
  height: ${convertPxToRem(80)};
  border-radius: 50%;
  background-color: pink;
`;

export const Name = styled.span`
  margin-top: 0.5em;
`;

export const Category = styled.h4`
  font-weight: bold;
  width: 100%;
  text-align: left;
`;

export const NavListItem = styled.li<{ selected?: boolean }>`
  padding: 0.5em 0;
  transition: all 0.1s ease-in-out;
  opacity: 0.5;

  :hover {
    cursor: pointer;
    opacity: 1;
  }

  :first-of-type {
    padding-top: 1em;
  }

  :last-of-type {
    padding-bottom: 1em;
  }

  :selected {
    background-color: ${({ theme }) => theme.colors.backgroundGray};
  }
`;

export const RightContentWrapper = styled.div``;
