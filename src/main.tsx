import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainRouter from "./routes/MainRouter.tsx";

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <MainRouter />
  </StrictMode>
);
