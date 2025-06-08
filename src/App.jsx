import "./i18n";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";

import { MantineProvider, createTheme } from "@mantine/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import { RouteBuilder } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { MainErrorFallback } from "./components/MainErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

const theme = createTheme({
  other: {
    transition: "all 0.5s ease",
  },
  primaryColor: "indigo",
  colors: {
    brand: [
      "#eef2ff", //0
      "#e0e7ff", //1
      "#c7d2fe", //2
      "#a5b4fc", //3
      "#818cf8", //4
      "#6366f1", //5
      "#4f46e5", //6
      "#4338ca", //7
      "#3730a3", //8
      "#312e81", //9
    ],
    dark: [
      "#C1C2C5", //0 - lightest gray for dark mode
      "#A6A7AB", //1 - light gray text
      "#909296", //2 - medium gray
      "#5c5f66", //3 - darker gray
      "#373A40", //4 - dark gray backgrounds
      "#2C2E33", //5 - darker backgrounds
      "#25262b", //6 - main dark background
      "#1A1B1E", //7 - darker backgrounds
      "#141517", //8 - very dark
      "#101113", //9 - darkest
    ],
  },
  primaryShade: { light: 6, dark: 4 },
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
});

function App() {
  const queryClient = new QueryClient();
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="light"
      withGlobalStyles
      withNormalizeCSS
    >
      <ErrorBoundary
        FallbackComponent={MainErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/form" />} />
                {RouteBuilder().map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
              </Route>
            </Routes>
          </Router>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            tosatOptios={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "#d4d4d4",
                textColor: "#1e1e1e",
              },
            }}
          />
        </QueryClientProvider>
      </ErrorBoundary>
    </MantineProvider>
  );
}

export default App;
