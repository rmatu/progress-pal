import React from "react";
import ReactDOM from "react-dom";

import { WrappedModal } from "./styles";
import Backdrop from "./Backdrop/Backdrop";
import { ReactComponent as CancelIcon } from "../../../assets/svg/bolderClose.svg";

interface ModalProps {
  opened: boolean;
  close: () => void;
  children: React.ReactNode | React.ReactNode[];
}

//This will be rerender only if the props changes
const Modal = React.memo<ModalProps>(
  ({ opened, children, close }) => {
    return ReactDOM.createPortal(
      <>
        <Backdrop opened={opened} close={close} />
        <WrappedModal opened={opened}>
          <CancelIcon onClick={close} />
          {children}
        </WrappedModal>
      </>,
      //@ts-ignore
      document.getElementById("root-modal")
    );
  },
  (prevProps, nextProps) => {
    //if this returns false it will update
    return prevProps.opened === nextProps.opened;
  }
);

export default Modal;
