import React from "react";
import { StyledLoader } from "./styles";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <StyledLoader>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledLoader>
  );
};

export default Loader;
