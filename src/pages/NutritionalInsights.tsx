import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Salad,
  Heart,
  Target,
  Calendar,
  Download,
} from "lucide-react";

export default function NutritionalInsights() {
  const { toast } = useToast();
  const topNutritionItems = [
    {
      name: "Greek Yogurt - Plain",
      category: "Dairy",
      sales: 1247,
      growth: "+23%",
      nutrition: "High Protein",
      trending: "up",
    },
    {
      name: "Organic Spinach",
      category: "Produce",
      sales: 892,
      growth: "+18%",
      nutrition: "High Iron",
      trending: "up",
    },
    {
      name: "Quinoa",
      category: "Grains",
      sales: 534,
      growth: "+45%",
      nutrition: "Complete Protein",
      trending: "up",
    },
    {
      name: "Salmon Fillets",
      category: "Seafood",
      sales: 423,
      growth: "-5%",
      nutrition: "Omega-3",
      trending: "down",
    },
  ];

  const dietaryTrends = [
    {
      diet: "Plant-Based",
      percentage: 32,
      change: "+8%",
      color: "success",
    },
    {
      diet: "Keto",
      percentage: 18,
      change: "+3%",
      color: "warning",
    },
    {
      diet: "Mediterranean",
      percentage: 25,
      change: "+12%",
      color: "primary",
    },
    {
      diet: "Gluten-Free",
      percentage: 15,
      change: "-2%",
      color: "secondary",
    },
  ];

  const customerSegments = [
    {
      segment: "Health-Conscious Families",
      size: "2,847 customers",
      avgSpend: "$89.23",
      topCategory: "Organic Produce",
      growth: "+15%",
    },
    {
      segment: "Fitness Enthusiasts",
      size: "1,523 customers",
      avgSpend: "$67.45",
      topCategory: "Protein Products",
      growth: "+28%",
    },
    {
      segment: "Senior Nutrition",
      size: "934 customers",
      avgSpend: "$45.67",
      topCategory: "Heart-Healthy",
      growth: "+7%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Nutritional Insights Dashboard
          </h1>
          <p className="text-muted-foreground">
            Analytics on nutritional product trends and customer dietary preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline"
            onClick={() => toast({ title: "Export Started", description: "Downloading nutritional insights report..." })}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Salad className="h-4 w-4 text-success" />
              Healthy Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <div className="text-xs text-success mt-1">+23% growth</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Heart className="h-4 w-4 text-destructive" />
              Heart-Healthy Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,389</div>
            <div className="text-xs text-success mt-1">+18% vs last month</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-warning" />
              Diet-Focused Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,304</div>
            <div className="text-xs text-success mt-1">+12% new this month</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Nutrition Score Avg
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8/10</div>
            <div className="text-xs text-success mt-1">+0.3 improvement</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Nutritional Products */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Nutritional Products
            </CardTitle>
            <CardDescription>
              Best-selling products with high nutritional value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topNutritionItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.category} • {item.sales} units sold
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.nutrition}
                      </Badge>
                      {item.trending === "up" ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div className={`text-sm ${
                      item.trending === "up" ? "text-success" : "text-destructive"
                    }`}>
                      {item.growth}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dietary Trends */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Dietary Trends
            </CardTitle>
            <CardDescription>
              Customer dietary preferences and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dietaryTrends.map((trend, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{trend.diet}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{trend.percentage}%</span>
                      <Badge 
                        variant={trend.change.startsWith("+") ? "success" : "secondary"}
                        className="text-xs"
                      >
                        {trend.change}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-${trend.color}`}
                      style={{ width: `${trend.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segments */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Nutrition-Focused Customer Segments
          </CardTitle>
          <CardDescription>
            Customer groups based on nutritional purchasing patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {customerSegments.map((segment, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-card hover:bg-muted/20 transition-smooth"
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{segment.segment}</h3>
                    <p className="text-sm text-muted-foreground">{segment.size}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Avg Spend:</span>
                      <span className="font-medium">{segment.avgSpend}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Top Category:</span>
                      <span className="font-medium">{segment.topCategory}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Growth:</span>
                      <Badge variant="success" className="text-xs">
                        {segment.growth}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}