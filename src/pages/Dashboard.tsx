import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  AlertTriangle,
  DollarSign,
  Activity,
  Eye,
} from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const stats = [
    {
      title: "Active Digital Carts",
      value: "24",
      change: "+12%",
      icon: ShoppingCart,
      status: "live",
    },
    {
      title: "Low Stock Items",
      value: "12",
      change: "-5%",
      icon: AlertTriangle,
      status: "warning",
    },
    {
      title: "Today's Revenue",
      value: "$45,321",
      change: "+18%",
      icon: DollarSign,
      status: "success",
    },
    {
      title: "Support Tickets",
      value: "8",
      change: "-23%",
      icon: Users,
      status: "info",
    },
  ];

  const recentActivities = [
    {
      type: "inventory",
      message: "Low stock alert: Organic Bananas (12 units remaining)",
      time: "2 minutes ago",
      status: "warning",
    },
    {
      type: "cart",
      message: "Customer assistance requested at Cart #247",
      time: "5 minutes ago",
      status: "info",
    },
    {
      type: "transaction",
      message: "Digital wallet payment processed: $67.89",
      time: "8 minutes ago",
      status: "success",
    },
    {
      type: "recommendation",
      message: "ML model updated with new dietary preferences",
      time: "15 minutes ago",
      status: "info",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening in your store today.
          </p>
        </div>
        <Button 
          variant="walmart" 
          className="shadow-glow"
          onClick={() => toast({ title: "Live View Activated", description: "Real-time monitoring is now active." })}
        >
          <Activity className="mr-2 h-4 w-4" />
          Live View
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant={
                    stat.status === "success" ? "success" :
                    stat.status === "warning" ? "warning" : "secondary"
                  }
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
                {stat.status === "live" && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-xs text-success">Live</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest updates from all modules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === "success" ? "bg-success" :
                    activity.status === "warning" ? "bg-warning" : "bg-primary"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/inventory">
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </Link>
            <Link to="/carts">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="mr-2 h-4 w-4" />
                Monitor Carts
              </Button>
            </Link>
            <Link to="/insights">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </Link>
            <Link to="/support">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Customer Support
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}