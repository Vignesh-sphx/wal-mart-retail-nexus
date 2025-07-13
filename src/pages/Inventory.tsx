import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Plus,
  Search,
  Upload,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const inventoryItems = [
    {
      id: "WM001",
      name: "Organic Bananas",
      category: "Produce",
      price: 2.99,
      stock: 12,
      minStock: 20,
      barcode: "123456789012",
      nutrition: {
        calories: 105,
        protein: "1.3g",
        carbs: "27g",
        fat: "0.4g",
      },
      status: "low",
    },
    {
      id: "WM002",
      name: "Whole Milk - 1 Gallon",
      category: "Dairy",
      price: 4.29,
      stock: 48,
      minStock: 25,
      barcode: "123456789013",
      nutrition: {
        calories: 150,
        protein: "8g",
        carbs: "12g",
        fat: "8g",
      },
      status: "good",
    },
    {
      id: "WM003",
      name: "Whole Wheat Bread",
      category: "Bakery",
      price: 3.49,
      stock: 0,
      minStock: 15,
      barcode: "123456789014",
      nutrition: {
        calories: 80,
        protein: "4g",
        carbs: "14g",
        fat: "1g",
      },
      status: "out",
    },
    {
      id: "WM004",
      name: "Greek Yogurt - Plain",
      category: "Dairy",
      price: 5.99,
      stock: 67,
      minStock: 30,
      barcode: "123456789015",
      nutrition: {
        calories: 100,
        protein: "17g",
        carbs: "6g",
        fat: "0g",
      },
      status: "good",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "out":
        return <Badge variant="destructive">Out of Stock</Badge>;
      case "low":
        return <Badge variant="warning">Low Stock</Badge>;
      case "good":
        return <Badge variant="success">In Stock</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStockIcon = (current: number, min: number) => {
    if (current === 0) return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (current < min) return <TrendingDown className="h-4 w-4 text-warning" />;
    return <TrendingUp className="h-4 w-4 text-success" />;
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Inventory Management
          </h1>
          <p className="text-muted-foreground">
            Manage products, track stock levels, and monitor nutritional information
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Batch Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Batch Upload Products</DialogTitle>
                <DialogDescription>
                  Upload a CSV file to add multiple products at once
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input type="file" accept=".csv" />
                <Button className="w-full">Upload Products</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="walmart">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">12</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89,432</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="good">In Stock</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="out">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Nutrition</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {item.id} | Barcode: {item.barcode}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStockIcon(item.stock, item.minStock)}
                        <span>{item.stock} units</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="text-xs space-y-1">
                        <div>{item.nutrition.calories} cal</div>
                        <div>P: {item.nutrition.protein}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}