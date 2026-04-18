import React, { useContext } from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Navigate, 
  Outlet 
} from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import CitizenDashboard from './pages/CitizenDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CreateRequest from './pages/CreateRequest';
import Profile from './pages/Profile';

// Layout component to wrap pages with Navbar
const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

// Protected Route wrapper
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

// Dashboard Redirect Logic
const DashboardRedirect = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <LandingPage />;
  
  switch (user.role) {
    case 'Citizen': return <CitizenDashboard />;
    case 'Volunteer': return <VolunteerDashboard />;
    case 'Hospital':
    case 'NGO': return <HospitalDashboard />;
    case 'Admin': return <AdminDashboard />;
    default: return <LandingPage />;
  }
};

// Router Configuration
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <DashboardRedirect />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "create-request",
          element: (
            <ProtectedRoute roles={['Citizen']}>
              <CreateRequest />
            </ProtectedRoute>
          )
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          )
        },
        // Admin only route
        {
          path: "admin",
          element: (
            <ProtectedRoute roles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          )
        },
        // Standard 404 handler
        {
          path: "*",
          element: <Navigate to="/" replace />
        }
      ]
    }
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider 
        router={router} 
        future={{
          v7_startTransition: true,
        }}
      />
    </AuthProvider>
  );
}

export default App;
