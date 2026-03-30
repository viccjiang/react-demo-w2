import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import store from "./store/store";
import MessageToast from "./components/MessageToast";
import "./assets/style.css";
import routes from "./routes/index";

const router = createHashRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MessageToast />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
