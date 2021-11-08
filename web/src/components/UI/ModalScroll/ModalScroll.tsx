//@ts-nocheck

import React, { createRef, useEffect } from "react";
import styled from "styled-components/macro";
import { convertPxToRem } from "../../../utils/cssHelpers";
import { ReactComponent as CancelIcon } from "../../../assets/svg/bolderClose.svg";

interface ModalProps {
  autoScroll?: boolean;
  border?: boolean;
  children: React.ReactNode | React.ReactNode[];
  handleClose: () => void;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  maxSectionHeight?: string;
  noClose?: boolean;
  noPadding?: boolean;
  noTop?: boolean;
  scrollY?: boolean;
  show?: boolean;
  width?: string;
}

const ModalScroll: React.FC<ModalProps> = ({
  autoScroll,
  border,
  children,
  handleClose,
  height,
  minHeight,
  maxHeight,
  maxSectionHeight,
  noClose,
  noPadding,
  noTop,
  scrollY,
  show,
  width,
}) => {
  const modalRef = createRef();

  useEffect(() => {
    if (noClose) {
      return;
    }

    const handleClickOutside = e => {
      if (modalRef.current && show) {
        if (modalRef.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, [modalRef]);

  if (!show) {
    return null;
  }

  return (
    <ModalWrap noClose={noClose} noTop={noTop} show={show}>
      <ModalMain
        className="modalMain"
        autoScroll={autoScroll}
        border={border}
        height={height}
        minHeight={minHeight}
        maxHeight={maxHeight}
        noClose={noClose}
        noPadding={noPadding}
        noTop={noTop}
        ref={modalRef}
        scrollY={scrollY}
        width={width}
      >
        {!noClose && <CancelIcon className="cancel" onClick={handleClose} />}
        <StyledSection maxSectionHeight={maxSectionHeight}>
          {children}
        </StyledSection>
      </ModalMain>
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  display: block;
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-height: -webkit-fill-available;
  background: rgba(0, 0, 0, 0.7);
`;

const StyledSection = styled.section`
  overflow-y: auto;
  max-height: ${({ maxSectionHeight }) =>
    maxSectionHeight ? maxSectionHeight : ""};
`;

const ModalMain = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  flex-direction: column;
  width: ${({ width }) => (width ? width : convertPxToRem(600))};
  height: ${({ height }) => height && height};
  min-height: ${({ minHeight }) => minHeight};
  max-height: ${({ height, maxHeight, scrollY }) =>
    maxHeight
      ? maxHeight
      : scrollY
      ? height
        ? height
        : "70vh"
      : `calc(100vh - ${convertPxToRem(40)})`};
  margin-top: ${({ noClose, noTop }) =>
    noClose && !noTop ? convertPxToRem(-64) : 0};
  padding: ${({ noPadding }) => (noPadding ? 0 : convertPxToRem(25, 45))};
  transform: translate(-50%, -50%);
  border: ${({ border }) => border && border};
  outline: none;
  background: ${({ theme }) => theme.colors.backgroundDarkerGray};
  overflow-y: ${({ autoScroll }) => (autoScroll ? "auto" : "visible")};
  border-radius: 1em;

  .cancel {
    position: -webkit-sticky;
    position: sticky;
    height: 1em;
    top: 0.2em;
    right: 1em;
    fill: #fff;

    :hover {
      cursor: pointer;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
    background: #0d141f;
    background-color: #0d141f;
    border-radius: 0 8px 8px 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #525861;
    border-radius: 0 8px 8px 8px;
  }
  box-shadow: var(--lightest-shade) ${convertPxToRem(0, 5, 5)};

  @media screen and (max-width: 1000px) {
    width: 75vw;
  }

  @media screen and (max-width: 476px) {
    padding: ${convertPxToRem(18, 16)};
  }
`;

export default ModalScroll;
