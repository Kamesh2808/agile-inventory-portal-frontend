
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import SellerDashboard from "./pages/seller/Dashboard";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import AdminInventory from "./pages/admin/Inventory";
import StockRequests from "./pages/admin/StockRequests";
import StockTransfer from "./pages/admin/StockTransfer";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import Users from "./pages/admin/Users";
import SellerInventory from "./pages/seller/Inventory";
import RequestStock from "./pages/seller/RequestStock";
import Sales from "./pages/seller/Sales";
import SalesHistory from "./pages/seller/SalesHistory";
import Reports from "./pages/seller/Reports";
import SellerProfile from "./pages/seller/Profile";
import NotFound from "./pages/NotFound";

// Create a context to manage auth state
export const AuthContext = createContext({
  isAuthenticated: false,
  userRole: null as string | null,
  login: (role: string) => {},
  logout: () => {},
});

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Check for existing session on component mount
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setIsAuthenticated(true);
      setUserRole(savedRole);
    }
  }, []);

  const login = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("userRole", role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("userRole");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public route */}
              <Route 
                path="/" 
                element={
                  !isAuthenticated ? (
                    <Login />
                  ) : userRole === 'admin' ? (
                    <Navigate to="/admin" replace />
                  ) : (
                    <Navigate to="/seller" replace />
                  )
                } 
              />
              
              {/* Admin routes */}
              <Route 
                path="/admin" 
                element={
                  isAuthenticated && userRole === 'admin' ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/admin/products" 
                element={
                  isAuthenticated && userRole === 'admin' ? (
                    <Products />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/admin/categories" 
                element={
                  isAuthenticated && userRole === 'admin' ? (
                    <Categories />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/admin/inventory" 
                element={
                  isAuthenticated && userRole === 'admin' ? (
                    <AdminInventory />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/admin/stock-requests" 
                element={
                  isAuthenticated && userRole === 'admin' ? (
                    <StockRequests />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/admin/stock-transfer" 
                element={
                  isAuthenticated && userRole === 'admin' ? (
                    <StockTransfer />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/admin/analytics" 
                element={
                  isAuthenticated && userRole === 'admin' ? (
                    <Analytics />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/admin/settings" 
                element={
                  isAuthenticated && userRole === 'admin' ? (
                    <Settings />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  isAuthenticated && userRole === 'admin' ? (
                    <Users />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              
              {/* Seller routes */}
              <Route 
                path="/seller" 
                element={
                  isAuthenticated && userRole === 'seller' ? (
                    <SellerDashboard />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/seller/inventory" 
                element={
                  isAuthenticated && userRole === 'seller' ? (
                    <SellerInventory />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/seller/request-stock" 
                element={
                  isAuthenticated && userRole === 'seller' ? (
                    <RequestStock />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/seller/sales" 
                element={
                  isAuthenticated && userRole === 'seller' ? (
                    <Sales />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/seller/sales-history" 
                element={
                  isAuthenticated && userRole === 'seller' ? (
                    <SalesHistory />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/seller/reports" 
                element={
                  isAuthenticated && userRole === 'seller' ? (
                    <Reports />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/seller/profile" 
                element={
                  isAuthenticated && userRole === 'seller' ? (
                    <SellerProfile />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
