import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./app/App.tsx";
import { FeaturesPage } from "./app/pages/FeaturesPage.tsx";
import { HowItWorksPage } from "./app/pages/HowItWorksPage.tsx";
import { SecurityPage } from "./app/pages/SecurityPage.tsx";
import { UseCasesPage } from "./app/pages/UseCasesPage.tsx";
import { AboutPage } from "./app/pages/AboutPage.tsx";
import { PricingPage } from "./app/pages/PricingPage.tsx";
import "./styles/index.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/features", element: <FeaturesPage /> },
  { path: "/how-it-works", element: <HowItWorksPage /> },
  { path: "/security", element: <SecurityPage /> },
  { path: "/use-cases", element: <UseCasesPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/pricing", element: <PricingPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
