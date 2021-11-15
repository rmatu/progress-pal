import * as actions from "./modalTypes";
import { ModalState } from "./modalTypes";

const modalDefaultState: ModalState = {
  show: false,
};

const navbarReducer = (
  state = modalDefaultState,
  action: actions.ModalActionTypes,
) => {
  switch (action.type) {
    case actions.OPEN_MODAL:
      return {
        ...state,
        show: true,
      };
    case actions.CLOSE_MODAL:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

export default navbarReducer;
