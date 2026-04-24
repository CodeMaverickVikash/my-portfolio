import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const { isAuthenticated, isLoading } = useAuth();

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
  //         <p className="text-gray-600 dark:text-gray-400">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!isAuthenticated) {
  //   return <Navigate to={ROUTES.LOGIN} replace />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
