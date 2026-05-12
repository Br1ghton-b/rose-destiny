import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../stores/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuth((s) => s.currentUser());
  const location = useLocation();

  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }
  return <>{children}</>;
}
