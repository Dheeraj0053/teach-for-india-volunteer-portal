import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminSignupPage from './pages/AdminSignupPage';
import RegisterPage from './pages/RegisterPage';
import SuccessPage from './pages/SuccessPage';
import AdminDashboard from './pages/AdminDashboard';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { ROUTES } from './utils/constants';

function VolunteerPublicOnlyRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? ROUTES.ADMIN : ROUTES.REGISTER} replace />;
  }
  return children;
}

function AdminPublicOnlyRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (isAuthenticated && isAdmin) {
    return <Navigate to={ROUTES.ADMIN} replace />;
  }
  if (isAuthenticated && !isAdmin) {
    return <Navigate to={ROUTES.REGISTER} replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route
        path={ROUTES.LOGIN}
        element={
          <VolunteerPublicOnlyRoute>
            <LoginPage />
          </VolunteerPublicOnlyRoute>
        }
      />
      <Route
        path={ROUTES.SIGNUP}
        element={
          <VolunteerPublicOnlyRoute>
            <SignupPage />
          </VolunteerPublicOnlyRoute>
        }
      />
      <Route
        path={ROUTES.ADMIN_LOGIN}
        element={
          <AdminPublicOnlyRoute>
            <AdminLoginPage />
          </AdminPublicOnlyRoute>
        }
      />
      <Route
        path={ROUTES.ADMIN_SIGNUP}
        element={
          <AdminPublicOnlyRoute>
            <AdminSignupPage />
          </AdminPublicOnlyRoute>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <ProtectedRoute>
            <RegisterPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SUCCESS}
        element={
          <ProtectedRoute>
            <SuccessPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADMIN}
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              className: 'dark:!bg-slate-800 dark:!text-slate-100',
              style: {
                borderRadius: '12px',
                fontFamily: 'Inter, sans-serif',
              },
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
