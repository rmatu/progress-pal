import { combineReducers } from "redux";
import navbarReducer from "./navbar/navbarReducer";
import dashboardNavbarReducer from "./dashboardNavbar/dashboardNavbarReducer";
import popupReducer from "./popup/popupReducer";
import modalReducer from "./modal/modalReducer";

const rootReducer = combineReducers({
  navbar: navbarReducer,
  dashboardNavbar: dashboardNavbarReducer,
  popup: popupReducer,
  modal: modalReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
