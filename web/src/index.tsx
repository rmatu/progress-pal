import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./theme/global";
import theme from "./theme/theme";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { Provider as UrqlProvider } from "urql";
import { client } from "./utils/createUrqlClient";

ReactDOM.render(
  <UrqlProvider value={client}>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </UrqlProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
