import { combineReducers } from "redux";
import navbarReducer from "./navbar/navbarReducer";
import dashboardNavbarReducer from "./dashboardNavbar/dashboardNavbarReducer";

const rootReducer = combineReducers({
  navbar: navbarReducer,
  dashboardNavbar: dashboardNavbarReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
