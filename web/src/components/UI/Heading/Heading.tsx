import React from "react";
import { Heading1, Heading2, Heading3, Heading4 } from "./styles";

export interface HeadingProps {
  children: React.ReactNode[] | React.ReactNode;
  color?: string;
  marginB?: string;
  textAlign?: string;
  size: string;
}

// Don't really know how to fix this
// @ts-ignore
const Heading: React.FC<HeadingProps> = ({
  children,
  color = "white",
  marginB = "0",
  textAlign,
  size,
}) => {
  if (size === "h1")
    return (
      <Heading1 color={color} marginB={marginB} textAlign={textAlign}>
        {children}
      </Heading1>
    );
  if (size === "h2")
    return (
      <Heading2 color={color} marginB={marginB} textAlign={textAlign}>
        {children}
      </Heading2>
    );
  if (size === "h3")
    return (
      <Heading3 color={color} marginB={marginB} textAlign={textAlign}>
        {children}
      </Heading3>
    );
  if (size === "h4")
    return (
      <Heading4 color={color} marginB={marginB} textAlign={textAlign}>
        {children}
      </Heading4>
    );
};
export default Heading;
