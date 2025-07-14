import { useState } from "react";
import { CreditCard, TrendingUp, DollarSign, Clock, Filter, Search, Eye, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const transactions = [
  { id: "TXN001", customerId: "CUST001", amount: 89.47, type: "Digital Wallet", status: "Completed", timestamp: "2024-01-15 14:23", items: 5 },
  { id: "TXN002", customerId: "CUST002", amount: 156.78, type: "Pre-order", status: "Pending", timestamp: "2024-01-15 14:15", items: 8 },
  { id: "TXN003", customerId: "CUST003", amount: 23.99, type: "Queue-less Pickup", status: "Completed", timestamp: "2024-01-15 14:10", items: 2 },
  { id: "TXN004", customerId: "CUST004", amount: 312.45, type: "Digital Cart", status: "Processing", timestamp: "2024-01-15 14:05", items: 12 },
  { id: "TXN005", customerId: "CUST005", amount: 67.23, type: "Digital Wallet", status: "Failed", timestamp: "2024-01-15 13:58", items: 4 },
];

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || transaction.status.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleViewTransaction = (transactionId: string) => {
    toast({ title: "View Transaction", description: `Viewing details for ${transactionId}` });
  };

  const handleDownloadReport = () => {
    toast({ title: "Download Report", description: "Transaction report downloaded" });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "success";
      case "processing": return "default";
      case "pending": return "secondary";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case "digital wallet": return "default";
      case "pre-order": return "secondary";
      case "queue-less pickup": return "success";
      case "digital cart": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transaction & Wallet Logs</h1>
          <p className="text-muted-foreground">Monitor digital and offline wallet transactions</p>
        </div>
        <Button onClick={handleDownloadReport} className="gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+8.2% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Digital Wallet</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Of total transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3s</div>
            <p className="text-xs text-muted-foreground">Average processing</p>
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
                placeholder="Search by transaction ID or customer ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("all")}
              >
                All
              </Button>
              <Button
                variant={selectedFilter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("completed")}
              >
                Completed
              </Button>
              <Button
                variant={selectedFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("pending")}
              >
                Pending
              </Button>
              <Button
                variant={selectedFilter === "failed" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("failed")}
              >
                Failed
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-smooth"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{transaction.id}</h3>
                    <p className="text-sm text-muted-foreground">Customer: {transaction.customerId}</p>
                    <p className="text-xs text-muted-foreground">{transaction.timestamp}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-lg">${transaction.amount}</p>
                    <p className="text-xs text-muted-foreground">{transaction.items} items</p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Badge variant={getTypeBadgeVariant(transaction.type)}>
                      {transaction.type}
                    </Badge>
                    <Badge variant={getStatusBadgeVariant(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewTransaction(transaction.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}