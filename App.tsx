
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import DashboardHome from './pages/DashboardHome';
import ArticleWriter from './pages/ArticleWriter';
import CommunityPage from './pages/CommunityPage';
import ImageGenerator from './pages/ImageGenerator';
import SeoAnalyzer from './pages/SeoAnalyzer';
import ContentIdeas from './pages/ContentIdeas';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import BlogPage from './pages/BlogPage';
import { About, Privacy, Terms, Contact } from './pages/StaticPages';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center bg-gray-50 text-primary font-bold">جاري التحميل...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Layout for Dashboard Pages (Sidebar + Header)
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Close sidebar on route change (mobile)
  const location = useLocation();
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
          <div className="p-6 text-center text-gray-400 text-sm">
            © 2024 منصة المبدع. جميع الحقوق محفوظة.
          </div>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
             <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="writer" element={<ArticleWriter />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="image-gen" element={<ImageGenerator />} />
                <Route path="seo" element={<SeoAnalyzer />} />
                <Route path="ideas" element={<ContentIdeas />} />
             </Route>
          </Route>

          {/* Information Pages & Blog (Wrapped in Dashboard Layout for consistency, can be public or protected) */}
          <Route element={<DashboardLayout />}>
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;