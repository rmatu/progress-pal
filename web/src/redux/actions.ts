import { NavbarActionTypes } from "./navbar/navbarTypes";
import { DashboardNavbarActionTypes } from "./dashboardNavbar/dashboardNavbarTypes";
import { PopupActionTypes } from "./popup/popupTypes";
import { ModalActionTypes } from "./modal/modalTypes";

export type AppActions =
  | NavbarActionTypes
  | DashboardNavbarActionTypes
  | PopupActionTypes
  | ModalActionTypes;
