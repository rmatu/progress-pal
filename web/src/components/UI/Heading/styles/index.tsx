import styled, { css } from "styled-components/macro";

export interface Props {
  color: string;
  marginB: string;
  size?: string;
  textAlign?: string;
  padding?: string;
}

const baseStyle = css<Props>`
  color: ${({ color, theme }) => {
    if (color === "white") return "#fff";
    if (color === "black") return "#000";
  }};
  margin-top: 0;
  margin-bottom: ${({ marginB }) => marginB};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "center")};
  padding: ${({ padding }) => (padding ? padding : "0 0.5em")};
`;

export const Heading1 = styled.h1`
  font-size: 3.25rem;
  ${baseStyle}
`;

export const Heading2 = styled.h2`
  font-size: 2.375rem;
  ${baseStyle}
`;

export const Heading3 = styled.h3`
  font-size: 1.8rem;
  ${baseStyle}
`;

export const Heading4 = styled.h4`
  font-size: 1.5rem;
  ${baseStyle}
`;
