import * as actions from "./dashboardNavbarTypes";
import {
  DashboardNavbarState,
  DashboardNavbarActionTypes,
} from "./dashboardNavbarTypes";

const dashboardNavbarDefaultState: DashboardNavbarState = {
  open: false,
  visible: false,
  selectedItem: "/",
};

const dashboardNavbarReducer = (
  state = dashboardNavbarDefaultState,
  action: DashboardNavbarActionTypes,
) => {
  switch (action.type) {
    case actions.DASH_TOGGLE_NAVBAR:
      return {
        ...state,
        open: !state.open,
      };
    case actions.DASH_SET_OPEN:
      return {
        ...state,
        open: action.payload,
      };
    case actions.DASH_SET_NAV_ITEM_NAME:
      return {
        ...state,
        selectedItem: action.payload,
      };
    case actions.DASH_CLEAN_UP_NAVBAR:
      return {
        ...state,
        open: false,
      };
    case actions.DASH_SET_VISIBILITY:
      return {
        ...state,
        visible: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardNavbarReducer;
