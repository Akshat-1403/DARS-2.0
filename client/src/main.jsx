import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LoginModal } from "./components";
import { ContextProvider } from "./context/context";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ContextProvider>
    <LoginModal />
    <App />
  </ContextProvider>
);
