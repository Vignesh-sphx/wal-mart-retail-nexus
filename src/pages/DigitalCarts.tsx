import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  ShoppingCart,
  User,
  MapPin,
  Clock,
  MessageSquare,
  Phone,
  AlertCircle,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";

export default function DigitalCarts() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const activeCarts = [
    {
      id: "CART-247",
      customer: "Sarah Johnson",
      location: "Aisle 7 - Produce",
      items: 8,
      total: 47.23,
      duration: "12m 34s",
      status: "active",
      assistance: false,
      lastActivity: "2 min ago",
    },
    {
      id: "CART-248",
      customer: "Mike Chen",
      location: "Aisle 3 - Dairy",
      items: 3,
      total: 18.97,
      duration: "5m 12s",
      status: "active",
      assistance: true,
      lastActivity: "30s ago",
    },
    {
      id: "CART-249",
      customer: "Emma Davis",
      location: "Self-Checkout",
      items: 15,
      total: 89.45,
      duration: "23m 45s",
      status: "checking-out",
      assistance: false,
      lastActivity: "1 min ago",
    },
    {
      id: "CART-250",
      customer: "James Wilson",
      location: "Aisle 12 - Electronics",
      items: 2,
      total: 124.99,
      duration: "8m 22s",
      status: "active",
      assistance: false,
      lastActivity: "4 min ago",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "checking-out":
        return <Badge variant="warning">Checking Out</Badge>;
      case "assistance":
        return <Badge variant="destructive">Needs Help</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredCarts = activeCarts.filter(cart => {
    const matchesSearch = cart.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cart.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "all" || cart.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Digital Cart Monitor
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring of customer digital shopping carts
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => toast({ title: "Refreshed", description: "Cart data updated successfully." })}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-success font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Carts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-xs text-success">+3 from last hour</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Need Assistance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">5</div>
            <div className="text-xs text-muted-foreground mt-1">2 urgent</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Cart Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$67.89</div>
            <div className="text-xs text-success mt-1">+12% vs yesterday</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Checkout Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-muted-foreground mt-1">Avg wait: 3m 45s</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Carts Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Active Shopping Carts
          </CardTitle>
          <CardDescription>
            Monitor customer shopping progress and provide assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search carts or customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("all")}
              >
                All
              </Button>
              <Button
                variant={activeFilter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("active")}
              >
                Active
              </Button>
              <Button
                variant={activeFilter === "checking-out" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("checking-out")}
              >
                Checkout
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cart ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCarts.map((cart) => (
                  <TableRow key={cart.id} className={cart.assistance ? "bg-warning/5" : ""}>
                    <TableCell className="font-mono">{cart.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {cart.customer}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {cart.location}
                      </div>
                    </TableCell>
                    <TableCell>{cart.items} items</TableCell>
                    <TableCell>${cart.total}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {cart.duration}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(cart.status)}
                        {cart.assistance && (
                          <AlertCircle className="h-4 w-4 text-warning animate-pulse" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Chat with {cart.customer}</DialogTitle>
                              <DialogDescription>
                                Provide assistance to customer in {cart.id}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="h-64 border rounded-md p-4 bg-muted/20">
                                <p className="text-sm text-muted-foreground">
                                  Chat interface would be implemented here...
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Input placeholder="Type your message..." />
                                <Button onClick={() => toast({ title: "Message Sent", description: "Response sent to customer." })}>
                                  Send
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toast({ title: "Call Started", description: `Calling ${cart.customer}...` })}
                        >
                          <Phone className="h-4 w-4" />
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