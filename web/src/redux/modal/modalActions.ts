import * as actions from "./modalTypes";

export const openModal = () => ({
  type: actions.OPEN_MODAL,
});

export const closeModal = () => ({
  type: actions.CLOSE_MODAL,
});
