import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/hooks/useAuth";
import LanguageRoute from "@/components/LanguageRoute";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Default English routes */}
              <Route path="/" element={<LanguageRoute><Index /></LanguageRoute>} />
              <Route path="/login" element={<LanguageRoute><Login /></LanguageRoute>} />
              <Route path="/forgot-password" element={<LanguageRoute><ForgotPassword /></LanguageRoute>} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<LanguageRoute><Dashboard /></LanguageRoute>} />
              <Route path="/admin" element={<LanguageRoute><Admin /></LanguageRoute>} />

              {/* Kinyarwanda routes under /rw prefix */}
              <Route path="/rw" element={<LanguageRoute><Index /></LanguageRoute>} />
              <Route path="/rw/login" element={<LanguageRoute><Login /></LanguageRoute>} />
              <Route path="/rw/forgot-password" element={<LanguageRoute><ForgotPassword /></LanguageRoute>} />
              <Route path="/rw/dashboard" element={<LanguageRoute><Dashboard /></LanguageRoute>} />
              <Route path="/rw/admin" element={<LanguageRoute><Admin /></LanguageRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
