import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./Styles.css";
import { UsersApp } from "./UsersApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UsersApp />
    </BrowserRouter>
  </StrictMode>
);
