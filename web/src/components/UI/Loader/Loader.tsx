import React from "react";
import styled, { keyframes } from "styled-components/macro";

interface LoaderProps {
  bgShadow?: boolean;
  layoutLoaderUI?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ bgShadow = true, layoutLoaderUI }) => {
  if (layoutLoaderUI) {
    return (
      <Wrapper>
        <SkChase>
          <SkChaseDot bgShadow={bgShadow} />
          <SkChaseDot bgShadow={bgShadow} />
          <SkChaseDot bgShadow={bgShadow} />
          <SkChaseDot bgShadow={bgShadow} />
          <SkChaseDot bgShadow={bgShadow} />
          <SkChaseDot bgShadow={bgShadow} />
        </SkChase>
      </Wrapper>
    );
  }

  return (
    <SkChase>
      <SkChaseDot bgShadow={bgShadow} />
      <SkChaseDot bgShadow={bgShadow} />
      <SkChaseDot bgShadow={bgShadow} />
      <SkChaseDot bgShadow={bgShadow} />
      <SkChaseDot bgShadow={bgShadow} />
      <SkChaseDot bgShadow={bgShadow} />
    </SkChase>
  );
};

export default Loader;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const Chase = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
const ChaseDot = keyframes`
   80%,
  100% {
    transform: rotate(360deg);
  }
`;

const ChaseBefore = keyframes`
  50% {
    transform: scale(0.4);
  }
  100%,
  0% {
    transform: scale(1);
  }
`;

const SkChase = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  animation: ${Chase} 2.5s infinite linear both;
`;

const SkChaseDot = styled.div<{ bgShadow: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: ${ChaseDot} 2s infinite ease-in-out both;
  :before {
    content: "";
    display: block;
    width: 25%;
    height: 25%;
    background-color: white;
    border-radius: 100%;
    animation: ${ChaseBefore} 2s infinite ease-in-out both;
  }
  :nth-child(1) {
    animation-delay: -1.1s;
  }
  :nth-child(2) {
    animation-delay: -1s;
  }
  :nth-child(3) {
    animation-delay: -0.9s;
  }
  :nth-child(4) {
    animation-delay: -0.8s;
  }
  :nth-child(5) {
    animation-delay: -0.7s;
  }
  :nth-child(6) {
    animation-delay: -0.6s;
  }
  :nth-child(1):before {
    animation-delay: -1.1s;
  }
  :nth-child(2):before {
    animation-delay: -1s;
  }
  :nth-child(3):before {
    animation-delay: -0.9s;
  }
  :nth-child(4):before {
    animation-delay: -0.8s;
  }
  :nth-child(5):before {
    animation-delay: -0.7s;
  }
  :nth-child(6):before {
    animation-delay: -0.6s;
  }
`;
