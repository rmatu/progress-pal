import * as actions from "./dashboardNavbarTypes";

export const toggleNavbar = () => ({
  type: actions.DASH_TOGGLE_NAVBAR,
});

export const cleanUp = () => ({
  type: actions.DASH_CLEAN_UP_NAVBAR,
});

export const setVisibility = (visibility: boolean) => ({
  type: actions.DASH_SET_VISIBILITY,
  payload: visibility,
});

export const setOpen = (open: boolean) => ({
  type: actions.DASH_SET_OPEN,
  payload: open,
});

export const changeItem = (name: string) => ({
  type: actions.DASH_SET_NAV_ITEM_NAME,
  payload: name,
});
