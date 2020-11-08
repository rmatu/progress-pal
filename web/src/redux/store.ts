import { AppActions } from "./actions";
import { compose, createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";

import rootReducer, { AppState } from "./rootReducer";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
      compose
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({} as ThunkMiddleware<AppState, AppActions>)
    )
  )
);

export default store;
