import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LogInPage from "./pages/LogInPage";
import HomePage from "./pages/HomePage";
import ActivityPage from "./pages/ActivityPage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-white" size={32} />
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
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RedirectAuthenticatedUser>
                <div className="fixed inset-0 max-w-5xl mx-auto flex items-center justify-center p-4">
                  <RegisterPage />
                </div>
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <div className="fixed inset-0 max-w-5xl mx-auto flex items-center justify-center p-4">
                  <LogInPage />
                </div>
              </RedirectAuthenticatedUser>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
