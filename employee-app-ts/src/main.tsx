import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Root element #root not found"); // narrowing: HTMLElement | null -> HTMLElement
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
