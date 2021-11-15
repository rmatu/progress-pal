import { NavbarActionTypes } from "./navbar/navbarTypes";
import { DashboardNavbarActionTypes } from "./dashboardNavbar/dashboardNavbarTypes";
import { PopupActionTypes } from "./popup/popupTypes";

export type AppActions =
  | NavbarActionTypes
  | DashboardNavbarActionTypes
  | PopupActionTypes;
