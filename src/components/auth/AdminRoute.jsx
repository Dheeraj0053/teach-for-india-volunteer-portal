import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/constants';
import LoadingSpinner from '../ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated && !isAdmin) {
      toast.error('You do not have admin access');
    }
  }, [loading, isAuthenticated, isAdmin]);

  if (loading) return <LoadingSpinner message="Verifying access..." />;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}
