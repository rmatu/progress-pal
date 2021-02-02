import React from "react";
import { Wrapper } from "./styles";

interface PopupProps {
  showPopup: boolean;
}

const Popup: React.FC<PopupProps> = ({ showPopup, children }) => {
  return <Wrapper showPopup={showPopup}>{children}</Wrapper>;
};
export default Popup;
