export const SET_POPUP_VISIBILITY = "SET_POPUP_VISIBILITY";
export const RESET_POPUP = "RESET_POPUP";

export interface SetPopupVisibility {
  type: typeof SET_POPUP_VISIBILITY;
  payload: {
    visibility: boolean;
    text: string;
    popupType: "error" | "success";
  };
}

export interface ResetPopup {
  type: typeof RESET_POPUP;
  payload: {
    visibility: boolean;
    text: string;
  };
}

export interface PopupState {
  show: boolean;
  text: string;
  popupType: "error" | "success";
}

export type PopupActionTypes = SetPopupVisibility | ResetPopup;
