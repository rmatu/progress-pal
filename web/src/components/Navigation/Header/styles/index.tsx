import styled from "styled-components/macro";

export const FixedWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0em 2em;
  top: 0;
  left: 0;
  width: 100%;
  height: 4.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-box-shadow: 0px 3px 19px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 19px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 3px 19px 0px rgba(0, 0, 0, 0.75);
  border-bottom: solid 1px ${({ theme }) => theme.colors.gray};
`;

export const LogoText = styled.p`
  color: #fff;
  font-size: 1.3rem;
  font-weight: bold;
  z-index: 999;
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
