export const DASH_TOGGLE_NAVBAR = "DASH_TOGGLE_NAVBAR";
export const DASH_CLEAN_UP_NAVBAR = "DASH_CLEAN_UP_NAVBAR";
export const DASH_SET_NAV_ITEM_NAME = "DASH_SET_NAV_ITEM_NAME";
export const DASH_SET_VISIBILITY = "DASH_SET_VISIBILITY";
export const DASH_SET_OPEN = "DASH_SET_OPEN";

export interface DashSetVisibility {
  type: typeof DASH_SET_VISIBILITY;
  payload: boolean;
}

export interface DashSetOpen {
  type: typeof DASH_SET_OPEN;
  payload: boolean;
}

export interface DashSetNavItemNameAction {
  type: typeof DASH_SET_NAV_ITEM_NAME;
  payload: string;
}

export interface DashToggleNavbarAction {
  type: typeof DASH_TOGGLE_NAVBAR;
}

export interface DashCleanUpNavbarAction {
  type: typeof DASH_CLEAN_UP_NAVBAR;
}

export interface DashboardNavbarState {
  open: boolean;
  selectedItem:
    | "add-workout"
    | "add-exercise"
    | "dashboard"
    | "daily-activities"
    | "workouts"
    | "donate"
    | "account";
  visible?: boolean;
}

export type DashboardNavbarActionTypes =
  | DashSetOpen
  | DashSetNavItemNameAction
  | DashToggleNavbarAction
  | DashCleanUpNavbarAction
  | DashSetVisibility;
