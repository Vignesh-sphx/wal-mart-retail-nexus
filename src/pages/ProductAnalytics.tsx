import { useState } from "react";
import { BarChart3, TrendingUp, Package, Eye, RefreshCw, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const productData = [
  { id: "P001", name: "Organic Bananas", category: "Produce", sales: 1247, revenue: 1871.95, trend: "+12%", status: "Hot" },
  { id: "P002", name: "Great Value Milk", category: "Dairy", sales: 892, revenue: 2676.89, trend: "+8%", status: "Trending" },
  { id: "P003", name: "Chicken Breast", category: "Meat", sales: 634, revenue: 4761.23, trend: "-3%", status: "Stable" },
  { id: "P004", name: "Whole Wheat Bread", category: "Bakery", sales: 456, revenue: 1368.67, trend: "+15%", status: "Rising" },
  { id: "P005", name: "Greek Yogurt", category: "Dairy", sales: 389, revenue: 1945.89, trend: "+22%", status: "Hot" },
];

const liveMetrics = [
  { metric: "Current Shoppers", value: "342", change: "+23" },
  { metric: "Items Scanned/min", value: "127", change: "+5" },
  { metric: "Checkout Rate", value: "89%", change: "+2%" },
  { metric: "Cart Abandonment", value: "12%", change: "-4%" },
];

export default function ProductAnalytics() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast({ title: "Data Refreshed", description: "Live analytics updated successfully" });
    }, 2000);
  };

  const handleViewDetails = (productId: string) => {
    toast({ title: "Product Details", description: `Viewing detailed analytics for ${productId}` });
  };

  const handleDownloadReport = () => {
    toast({ title: "Download Report", description: "Product analytics report downloaded" });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "hot": return "destructive";
      case "trending": return "default";
      case "rising": return "success";
      case "stable": return "secondary";
      default: return "secondary";
    }
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith("+") ? "text-success" : trend.startsWith("-") ? "text-destructive" : "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Product Analytics</h1>
          <p className="text-muted-foreground">Live analysis and product performance insights</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleRefresh} 
            disabled={refreshing}
            variant="outline" 
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleDownloadReport} className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {liveMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${getTrendColor(metric.change)}`}>
                {metric.change} from last hour
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Product Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Real-time Product Performance
            <Badge variant="success" className="ml-auto">
              Live
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productData.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-smooth"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category} • {product.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Sales Today</p>
                    <p className="font-bold text-lg">{product.sales}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="font-bold text-lg">${product.revenue}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Trend</p>
                    <p className={`font-bold ${getTrendColor(product.trend)}`}>
                      {product.trend}
                    </p>
                  </div>

                  <Badge variant={getStatusBadgeVariant(product.status)}>
                    {product.status}
                  </Badge>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetails(product.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Categories Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Produce", "Dairy", "Meat", "Bakery", "Beverages"].map((category, index) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="font-medium">{category}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${(5 - index) * 20}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">${(5000 - index * 500).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => toast({ title: "Price Alert", description: "Price monitoring activated" })}
              >
                <TrendingUp className="h-4 w-4" />
                Set Price Alerts
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => toast({ title: "Inventory Check", description: "Checking inventory levels" })}
              >
                <Package className="h-4 w-4" />
                Check Inventory Impact
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => toast({ title: "Promotion Analysis", description: "Analyzing promotion effectiveness" })}
              >
                <BarChart3 className="h-4 w-4" />
                Analyze Promotions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}