import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerLicense } from "@syncfusion/ej2-base";

import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";

const container = document.getElementById("root");
const root = createRoot(container);

registerLicense(
  "ORg4AjUWIQA/Gnt2VVhiQlFaclpJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkxiXH5bdHVVRGRVUEY="
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
