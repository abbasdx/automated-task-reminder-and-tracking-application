import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react"; // ✨ Added useState & useEffect
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthCard from "./components/AuthCard";
import { isLoggedIn } from "./api/taskApi";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics"));
const LearnMore = lazy(() => import("./pages/LearnMore"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, refetchOnWindowFocus: false } },
});

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#030712]">
    <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
  </div>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(isLoggedIn());
    window.addEventListener("authStateChange", checkAuth);
    return () => window.removeEventListener("authStateChange", checkAuth);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#0a0e17', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      <div className="flex min-h-screen flex-col bg-[#030712] font-sans text-slate-200 selection:bg-indigo-500/30">
        <Navbar />

        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<LearnMore />} />
              <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthCard />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </QueryClientProvider>
  );
}