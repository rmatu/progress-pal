import styled from "styled-components/macro";

export const AuthWrapper = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 660px) {
    width: 100vw;
  }
`;

export const HeaderWrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 100;
`;

export const RestContent = styled.div`
  min-height: calc(100vh - 4.5rem);
`;
