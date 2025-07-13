import { NavLink, useLocation } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Headphones,
  Wallet,
  Users,
  Shield,
  Home,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

// Navigation items based on role and modules
const mainNavItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Inventory", url: "/inventory", icon: Package, badge: "12" },
  { title: "Digital Carts", url: "/carts", icon: ShoppingCart, badge: "live" },
  { title: "Nutritional Insights", url: "/insights", icon: BarChart3 },
  { title: "Recommendations", url: "/recommendations", icon: TrendingUp },
  { title: "Transactions", url: "/transactions", icon: Wallet },
];

const supportNavItems = [
  { title: "Customer Support", url: "/support", icon: Headphones, badge: "5" },
  { title: "User Management", url: "/users", icon: Users },
  { title: "System Settings", url: "/settings", icon: Settings },
];

const alertItems = [
  { title: "Low Stock Alerts", url: "/alerts", icon: AlertTriangle, badge: "3" },
  { title: "Security", url: "/security", icon: Shield },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    return isActive(path)
      ? "bg-primary text-primary-foreground font-medium"
      : "hover:bg-accent hover:text-accent-foreground transition-smooth";
  };

  const renderNavItem = (item: any) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <NavLink to={item.url} className={getNavClassName(item.url)}>
          <item.icon className="h-4 w-4" />
          {open && (
            <>
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <Badge 
                  variant={item.badge === "live" ? "success" : "secondary"} 
                  className="h-5 text-xs"
                >
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar className="border-r border-border/50 bg-card/30 backdrop-blur-sm">
      <SidebarContent className="py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support Tools */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground mb-2">
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {supportNavItems.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Alerts & Security */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground mb-2">
            Alerts
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {alertItems.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}