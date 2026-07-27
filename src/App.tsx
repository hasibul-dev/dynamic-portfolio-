import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProjectsProvider } from '@/context/ProjectsContext';
import { Header, Footer, WhatsAppButton } from '@/components/layout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { AdminLoginPage } from '@/pages/admin/LoginPage';
import { AdminDashboardPage } from '@/pages/admin/DashboardPage';
import '@/styles/globals.css';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-[#D9D9D9]">
      {!isAdminRoute && <Header />}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-[#7CFF00] mb-4">404</h1>
                  <p className="text-[#A0A0A0] mb-8">Page not found</p>
                  <a href="/" className="btn btn-primary">
                    Go Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
      {!isAdminRoute && <WhatsAppButton />}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProjectsProvider>
          <AppContent />
        </ProjectsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
