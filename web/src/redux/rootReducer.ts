import { combineReducers } from "redux";
import navbarReducer from "./navbar/navbarReducer";

const rootReducer = combineReducers({
  navbar: navbarReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
