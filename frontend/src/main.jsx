import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* this BrowserRouter tag helps us to use the Router tag from react-router-dom */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
