import React from "react";
import ReactDOM from "react-dom";
import { createDIContainerProvider } from "./useDIContainer";
import CookieDialog from "./CookieDialog";

import App from "./App";

const services = {
  analyticsService: {
    getOptInStatus: () => Promise.resolve("pendingResponse"),
    optIn: () => Promise.resolve(),
    optOut: () => Promise.resolve(),
    reset: () => Promise.resolve(),
    setUserId: () => Promise.resolve(),
    track: () => Promise.resolve()
  }
};
const DIContainerProvider = createDIContainerProvider(services);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <DIContainerProvider>
      <App />
      <CookieDialog />
    </DIContainerProvider>
    ,
  </React.StrictMode>,
  rootElement
);
