import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LogInPage from "./pages/LogInPage";
import HomePage from "./pages/HomePage";
import ActivityPage from "./pages/ActivityPage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import NetworkError from "./components/NetworkError";
import BattlePage from "./pages/BattlePage";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-linear-to-bl from-red-900 to-blue-900 flex flex-col items-center relative overflow-hidden">
        <div className="min-h-screen flex flex-col gap-1 items-center text-center justify-center">
          <Loader className="animate-spin text-white/50 mb-3" size={48} />
          <p className="text-text font-semibold text-2xl">
            {" "}
            Connecting to server...
          </p>
          <p className="text-text/70 font-semibold text-xl">
            {" "}
            May take up to 1 minute{" "}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-bl from-red-900 to-blue-900 flex flex-col items-center relative overflow-hidden">
      <div className="flex flex-col flex-1 w-full max-w-5xl">
        <Navbar />
        <Routes>
          <Route
            path="/activity"
            element={
              <ProtectedRoute>
                <ActivityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/battle"
            element={
              <ProtectedRoute>
                <BattlePage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RedirectAuthenticatedUser>
                <div className="flex flex-1 items-center justify-center">
                  <div className="w-full -translate-y-18">
                    <RegisterPage />
                  </div>
                </div>
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <div className="flex flex-1 items-center justify-center">
                  <div className="w-full -translate-y-18">
                    <LogInPage />
                  </div>
                </div>
              </RedirectAuthenticatedUser>
            }
          />
        </Routes>
      </div>
      <NetworkError />
    </div>
  );
}

export default App;
