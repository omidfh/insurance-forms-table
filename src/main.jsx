import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Loader, Center } from "@mantine/core";
import { MainErrorFallback } from "./components/MainErrorFallback.jsx";
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense
      fallback={
        <Center style={{ minHeight: "100vh" }}>
          <Loader size="lg" color="indigo" />
        </Center>
      }
    >
      <App />
    </Suspense>
  </StrictMode>
);
