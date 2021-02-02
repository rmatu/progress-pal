import styled from "styled-components/macro";

export const HeaderWrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 100;
`;

export const RestContent = styled.div`
  min-height: calc(100vh - 4.5rem);
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
