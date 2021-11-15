export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export interface OpenModal {
  type: typeof OPEN_MODAL;
}

export interface CloseModal {
  type: typeof CLOSE_MODAL;
}

export interface ModalState {
  show: boolean;
}

export type ModalActionTypes = OpenModal | CloseModal;
