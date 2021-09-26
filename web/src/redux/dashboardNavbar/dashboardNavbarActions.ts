import * as actions from "./dashboardNavbarTypes";

export const toggleNavbar = () => ({
  type: actions.TOGGLE_NAVBAR,
});

export const cleanUp = () => ({
  type: actions.CLEAN_UP_NAVBAR,
});

export const setVisibility = (visibility: boolean) => ({
  type: actions.SET_VISIBILITY,
  payload: visibility,
});

export const changeItem = (name: string) => ({
  type: actions.SET_NAV_ITEM_NAME,
  payload: name,
});
