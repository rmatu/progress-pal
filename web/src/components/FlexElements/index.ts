import styled, { css } from "styled-components/macro";

interface FlexWrapperProps {
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  borderRadius?: string;
  gap?: string;
  position?: string;
}

export const FlexWrapperDiv = styled.div<FlexWrapperProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ backgroundColor }) => backgroundColor};
  gap: ${({ gap }) => gap};
  position: ${({ position }) => position};
`;

export const FlexWrapperUl = styled.ul<FlexWrapperProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ backgroundColor }) => backgroundColor};
  gap: ${({ gap }) => gap};
  position: ${({ position }) => position};
`;
