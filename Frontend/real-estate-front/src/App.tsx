import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";

import { theme } from "./styles/theme";
import { queryClient } from "./config/queryClient";
import { AppRoutes } from "./config/routes";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useScrollToTop } from "./hooks";
import {
  Header,
  Footer,
  ErrorBoundary,
  NetworkErrorBoundary,
} from "./components/common";
import { useLocation } from "react-router-dom";
import { ROUTES } from "./utils/constants";

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NetworkErrorBoundary>
            <LanguageProvider>
              <AuthProvider>
                <Router
                  future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                  }}
                >
                  <AppContent />
                </Router>
              </AuthProvider>
            </LanguageProvider>
          </NetworkErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

// Окремий компонент для контенту всередині Router
function AppContent() {
  useScrollToTop(); // Auto-scroll to top on route changes
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME;

  return (
    <div
      className="App"
      style={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        overflowY: "visible",
      }}
    >
      {!isHomePage && <Header />}
      <main>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
