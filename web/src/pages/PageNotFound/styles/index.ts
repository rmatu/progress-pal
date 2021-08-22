import styled from "styled-components/macro";

export const HeaderWrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 100;
`;

export const RestContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 6em);
`;

export const StatusCode = styled.h1`
  font-size: 20rem;
`;

export const Text = styled.p`
  font-size: 3rem;
  margin-bottom: 3em;
`;
