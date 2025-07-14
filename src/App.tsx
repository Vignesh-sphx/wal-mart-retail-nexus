import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import DigitalCarts from "./pages/DigitalCarts";
import NutritionalInsights from "./pages/NutritionalInsights";
import CustomerSupport from "./pages/CustomerSupport";
import UserManagement from "./pages/UserManagement";
import Transactions from "./pages/Transactions";
import ProductAnalytics from "./pages/ProductAnalytics";
import LowStockAlerts from "./pages/LowStockAlerts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/carts" element={<DigitalCarts />} />
            <Route path="/insights" element={<NutritionalInsights />} />
            <Route path="/support" element={<CustomerSupport />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<ProductAnalytics />} />
            <Route path="/alerts" element={<LowStockAlerts />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RootLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
