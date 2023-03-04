import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./Components/store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
