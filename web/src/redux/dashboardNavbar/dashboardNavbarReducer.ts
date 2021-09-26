import * as actions from "./dashboardNavbarTypes";
import {
  DashboardNavbarState,
  DashboardNavbarActionTypes,
} from "./dashboardNavbarTypes";

const dashboardNavbarDefaultState: DashboardNavbarState = {
  open: false,
  visible: false,
  selectedItem: "dashboard",
};

const dashboardNavbarReducer = (
  state = dashboardNavbarDefaultState,
  action: DashboardNavbarActionTypes,
) => {
  switch (action.type) {
    case actions.TOGGLE_NAVBAR:
      return {
        ...state,
        open: !state.open,
      };
    case actions.SET_NAV_ITEM_NAME:
      return {
        ...state,
        selectedItem: action.payload,
      };
    case actions.CLEAN_UP_NAVBAR:
      return {
        ...state,
        open: false,
      };
    case actions.SET_VISIBILITY:
      return {
        ...state,
        visible: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardNavbarReducer;
