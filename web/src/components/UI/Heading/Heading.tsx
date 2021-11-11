import React from "react";
import { Heading1, Heading2, Heading3, Heading4 } from "./styles";

export interface HeadingProps {
  children: React.ReactNode[] | React.ReactNode;
  size: string;
  color?: string;
  marginB?: string;
  textAlign?: string;
  padding?: string;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  color = "white",
  marginB = "0",
  padding,
  textAlign,
  size,
}) => {
  if (size === "h1")
    return (
      <Heading1
        color={color}
        marginB={marginB}
        textAlign={textAlign}
        padding={padding}
      >
        {children}
      </Heading1>
    );
  if (size === "h2")
    return (
      <Heading2
        color={color}
        marginB={marginB}
        textAlign={textAlign}
        padding={padding}
      >
        {children}
      </Heading2>
    );
  if (size === "h3")
    return (
      <Heading3
        color={color}
        marginB={marginB}
        textAlign={textAlign}
        padding={padding}
      >
        {children}
      </Heading3>
    );
  if (size === "h4")
    return (
      <Heading4
        color={color}
        marginB={marginB}
        textAlign={textAlign}
        padding={padding}
      >
        {children}
      </Heading4>
    );

  return (
    <Heading1
      color={color}
      marginB={marginB}
      textAlign={textAlign}
      padding={padding}
    >
      {children}
    </Heading1>
  );
};
export default Heading;
