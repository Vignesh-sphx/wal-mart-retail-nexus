import { useState } from "react";
import { AlertTriangle, Package, RefreshCw, CheckCircle, XCircle, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const lowStockItems = [
  { id: "P001", name: "Organic Bananas", currentStock: 12, minStock: 50, category: "Produce", supplier: "Fresh Farms", urgency: "Critical" },
  { id: "P002", name: "Greek Yogurt", currentStock: 23, minStock: 40, category: "Dairy", supplier: "Dairy Co", urgency: "High" },
  { id: "P003", name: "Whole Wheat Bread", currentStock: 8, minStock: 25, category: "Bakery", supplier: "Baker's Best", urgency: "Critical" },
  { id: "P004", name: "Chicken Breast", currentStock: 15, minStock: 30, category: "Meat", supplier: "Meat Masters", urgency: "Medium" },
  { id: "P005", name: "Energy Drinks", currentStock: 18, minStock: 45, category: "Beverages", supplier: "Drink Inc", urgency: "High" },
];

export default function LowStockAlerts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("all");

  const filteredItems = lowStockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUrgency = selectedUrgency === "all" || item.urgency.toLowerCase() === selectedUrgency;
    return matchesSearch && matchesUrgency;
  });

  const handleReorder = (itemId: string) => {
    toast({ title: "Reorder Initiated", description: `Reorder request sent for item ${itemId}` });
  };

  const handleMarkResolved = (itemId: string) => {
    toast({ title: "Alert Resolved", description: `Low stock alert for ${itemId} marked as resolved` });
  };

  const handleIgnoreAlert = (itemId: string) => {
    toast({ title: "Alert Ignored", description: `Alert for ${itemId} temporarily ignored` });
  };

  const getUrgencyBadgeVariant = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "critical": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      default: return "outline";
    }
  };

  const getStockPercentage = (current: number, min: number) => {
    return Math.min((current / min) * 100, 100);
  };

  const getStockColor = (percentage: number) => {
    if (percentage <= 25) return "bg-destructive";
    if (percentage <= 50) return "bg-yellow-500";
    return "bg-success";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Low Stock Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage inventory alerts</p>
        </div>
        <Button 
          onClick={() => toast({ title: "Refresh", description: "Stock levels refreshed" })}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Stock
        </Button>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">8</div>
            <p className="text-xs text-muted-foreground">Immediate action required</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">15</div>
            <p className="text-xs text-muted-foreground">Reorder soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium Priority</CardTitle>
            <Package className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">12</div>
            <p className="text-xs text-muted-foreground">Monitor closely</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto Reorders</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">23</div>
            <p className="text-xs text-muted-foreground">Orders placed today</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by product name, category, or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedUrgency === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedUrgency("all")}
              >
                All
              </Button>
              <Button
                variant={selectedUrgency === "critical" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedUrgency("critical")}
              >
                Critical
              </Button>
              <Button
                variant={selectedUrgency === "high" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedUrgency("high")}
              >
                High
              </Button>
              <Button
                variant={selectedUrgency === "medium" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedUrgency("medium")}
              >
                Medium
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map((item) => {
              const stockPercentage = getStockPercentage(item.currentStock, item.minStock);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-smooth"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category} • {item.supplier}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs">Stock:</span>
                        <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getStockColor(stockPercentage)} rounded-full transition-all`}
                            style={{ width: `${stockPercentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item.currentStock}/{item.minStock}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant={getUrgencyBadgeVariant(item.urgency)}>
                      {item.urgency}
                    </Badge>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleReorder(item.id)}
                        className="gap-1"
                      >
                        <Package className="h-3 w-3" />
                        Reorder
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkResolved(item.id)}
                      >
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleIgnoreAlert(item.id)}
                      >
                        <XCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}