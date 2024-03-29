import styled from "styled-components/macro";

export const FixedWrapper = styled.div<{ dashboardHeader?: boolean }>`
  background-color: ${({ theme }) => theme.colors.backgroundDarkerGray};
  padding: 0em 2em;
  width: 100%;
  height: 6em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-box-shadow: 0px 3px 19px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 19px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 3px 19px 0px rgba(0, 0, 0, 0.75);

  @media screen and (min-width: 1024px) {
    display: ${({ dashboardHeader }) => dashboardHeader && "none"};
    top: 0;
  }

  @media (max-width: 420px) {
    padding: 0 2em 0 1em;
  }
`;

export const LogoWrapper = styled.div`
  z-index: 1000;
  padding-top: 1.125em;
  svg {
    height: 5em;
    width: 15em;
  }

  @media (max-width: 420px) {
    svg {
      height: 4.5em;
      width: 13em;
    }
  }
`;

export const HamburgerWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s;
  user-select: none;
  svg {
    height: 2em;
    width: 2em;
  }
  &:hover {
  }
`;

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
`;
