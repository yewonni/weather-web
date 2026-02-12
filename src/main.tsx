import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import App from "./app/App";
import HomePage from "./app/HomePage";
import DetailPage from "./app/DetailPage";
import "./styles/index.css";

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const detailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/detail",
  component: DetailPage,
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    q?: string;
    lat?: number;
    lon?: number;
  } => {
    return {
      q: search.q as string | undefined,
      lat: search.lat ? Number(search.lat) : undefined,
      lon: search.lon ? Number(search.lon) : undefined,
    };
  },
});

const routeTree = rootRoute.addChildren([indexRoute, detailRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
