import * as actions from "./popupTypes";
import { PopupState } from "./popupTypes";

const popupDefaultState: PopupState = {
  show: false,
  text: "",
  popupType: "success",
};

const navbarReducer = (
  state = popupDefaultState,
  action: actions.PopupActionTypes,
) => {
  switch (action.type) {
    case actions.SET_POPUP_VISIBILITY:
      return {
        ...state,
        show: action.payload.visibility,
        text: action.payload.text,
        popupType: action.payload.popupType,
      };
    default:
      return state;
  }
};

export default navbarReducer;
