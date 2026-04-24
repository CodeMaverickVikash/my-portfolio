import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDarkMode } from './hooks';
import { MainLayout } from './layouts';
import { Home, Profile, Contact, TechStack, Login, TechDetail } from './pages';
import { ProtectedRoute } from './components';
import { ROUTES } from './constants';
import { AuthProvider } from './context/AuthContext';
// Backend Admin UI
import { AdminDashboard, AdminTechStack, AdminTechStackForm, AdminProfile } from './admin';

function App() {
  const [isDarkModeEnabled, toggleDarkMode] = useDarkMode();

  return (
    <div className={`home-wrapper ${isDarkModeEnabled ? 'dark' : ''}`}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes with MainLayout */}
            <Route path={ROUTES.HOME} element={
              <MainLayout isDarkModeEnabled={isDarkModeEnabled} onToggleDarkMode={toggleDarkMode}>
                <Home />
              </MainLayout>
            } />
            <Route path={ROUTES.PROFILE} element={
              <MainLayout isDarkModeEnabled={isDarkModeEnabled} onToggleDarkMode={toggleDarkMode}>
                <Profile />
              </MainLayout>
            } />
            <Route path={ROUTES.CONTACT} element={
              <MainLayout isDarkModeEnabled={isDarkModeEnabled} onToggleDarkMode={toggleDarkMode}>
                <Contact />
              </MainLayout>
            } />
            <Route path={ROUTES.TECH_STACK} element={
              <MainLayout isDarkModeEnabled={isDarkModeEnabled} onToggleDarkMode={toggleDarkMode}>
                <TechStack />
              </MainLayout>
            } />
            <Route path={ROUTES.TECH_DETAIL} element={
              <MainLayout isDarkModeEnabled={isDarkModeEnabled} onToggleDarkMode={toggleDarkMode}>
                <TechDetail />
              </MainLayout>
            } />

            {/* Login Route (No Layout) */}
            <Route path={ROUTES.LOGIN} element={<Login />} />

            {/* Protected Admin Routes (Backend UI - Has its own AdminLayout) */}
            <Route path={ROUTES.ADMIN_DASHBOARD} element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path={ROUTES.ADMIN_TECH_STACK} element={
              <ProtectedRoute>
                <AdminTechStack />
              </ProtectedRoute>
            } />
            <Route path="/admin/tech-stack/add" element={
              <ProtectedRoute>
                <AdminTechStackForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/tech-stack/edit/:id" element={
              <ProtectedRoute>
                <AdminTechStackForm />
              </ProtectedRoute>
            } />
            <Route path={ROUTES.ADMIN_PROFILE} element={
              <ProtectedRoute>
                <AdminProfile />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

