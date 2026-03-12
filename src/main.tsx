import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { store } from "@app/store";
import { router } from "@app/router";
import { muiTheme, styledTheme, GlobalStyles } from "@app/styles";
import "./index.css";

const enableMocking = async () => {
  if (!import.meta.env.DEV) return;
  const { worker } = await import("@shared/mocks");
  return worker.start({ onUnhandledRequest: "bypass" });
};

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <StyledThemeProvider theme={styledTheme}>
            <CssBaseline />
            <GlobalStyles />
            <RouterProvider router={router} />
          </StyledThemeProvider>
        </MuiThemeProvider>
      </Provider>
    </StrictMode>,
  );
});
