import * as actions from "./popupTypes";

export const setPopupVisibility = (data: {
  visibility: boolean;
  text: string;
  popupType: "success" | "error";
}) => ({
  type: actions.SET_POPUP_VISIBILITY,
  payload: {
    visibility: data.visibility,
    text: data.text,
    popupType: data.popupType,
  },
});

export const resetPopup = () => ({
  type: actions.SET_POPUP_VISIBILITY,
  payload: {
    visibility: false,
    text: "",
  },
});
