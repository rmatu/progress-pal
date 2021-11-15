import { combineReducers } from "redux";
import navbarReducer from "./navbar/navbarReducer";
import dashboardNavbarReducer from "./dashboardNavbar/dashboardNavbarReducer";
import popupReducer from "./popup/popupReducer";

const rootReducer = combineReducers({
  navbar: navbarReducer,
  dashboardNavbar: dashboardNavbarReducer,
  popup: popupReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
