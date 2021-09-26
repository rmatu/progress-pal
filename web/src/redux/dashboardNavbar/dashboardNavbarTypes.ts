export const TOGGLE_NAVBAR = "TOGGLE_NAVBAR";
export const CLEAN_UP_NAVBAR = "CLEAN_UP_NAVBAR";
export const SET_NAV_ITEM_NAME = "SET_NAV_ITEM_NAME";
export const SET_VISIBILITY = "SET_VISIBILITY";

export interface SetVisibility {
  type: typeof SET_VISIBILITY;
  payload: boolean;
}

export interface SetNavItemNameAction {
  type: typeof SET_NAV_ITEM_NAME;
  payload: string;
}

export interface ToggleNavbarAction {
  type: typeof TOGGLE_NAVBAR;
}

export interface CleanUpNavbarAction {
  type: typeof CLEAN_UP_NAVBAR;
}

export interface DashboardNavbarState {
  open: boolean;
  selectedItem:
    | "addWorkout"
    | "addExercise"
    | "dashboard"
    | "dailyActivities"
    | "workouts"
    | "donate"
    | "account";
  visible?: boolean;
}

export type DashboardNavbarActionTypes =
  | SetNavItemNameAction
  | ToggleNavbarAction
  | CleanUpNavbarAction
  | SetVisibility;
