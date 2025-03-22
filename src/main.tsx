import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY =
  "pk_test_bW9yZS1iYXJuYWNsZS01MS5jbGVyay5hY2NvdW50cy5kZXYk";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
        </ClerkProvider>
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
);
