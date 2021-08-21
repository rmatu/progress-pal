import styled from "styled-components/macro";

export const HeaderWrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 100;
`;

export const RestContentWrapper = styled.div`
  padding: 2em 3.5em;
  font-size: 1.2rem;

  p,
  h2 {
    margin-bottom: 1.2em;
  }

  a {
    color: ${({ theme }) => theme.colors.orange};
    text-decoration: underline;
  }

  @media screen and (max-width: 420px) {
    padding: 2em 2em;
  }
`;
