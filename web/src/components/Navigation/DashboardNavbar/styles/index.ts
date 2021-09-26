import styled, { css } from "styled-components/macro";
import { convertPxToRem } from "../../../../utils/cssHelpers";

export const Wrapper = styled.nav`
  padding-right: 1em;
  min-width: ${convertPxToRem(200)};
  max-width: ${convertPxToRem(200)};
  max-height: calc(100vh);
  overflow-y: auto;
  border-right: 1px solid #3f3f3f;

  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
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
  margin-bottom: 0.5em;
`;

export const NavListItem = styled.li<{ selected?: boolean; button?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 0.5em;
  transition: all 0.1s ease-in-out;
  opacity: 0.5;
  width: 100%;
  border-radius: 0.5em;

  :hover {
    cursor: pointer;
    opacity: 1;
  }

  :first-of-type {
    margin-top: 1em;
  }

  :last-of-type {
    margin-bottom: 1em;
  }

  #add-circle {
    height: 100%;
    width: 20px;
  }

  ${({ button }) =>
    button &&
    css`
      justify-content: center;
    `}

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.colors.backgroundGray};
      opacity: 1;
    `}
`;
