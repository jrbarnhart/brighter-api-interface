import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainRouter from "./routes/MainRouter.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MainRouter />
    </QueryClientProvider>
  </StrictMode>
);
