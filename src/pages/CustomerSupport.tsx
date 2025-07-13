import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Headphones,
  MessageSquare,
  Phone,
  Video,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  Send,
  Search,
  Filter,
} from "lucide-react";

export default function CustomerSupport() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("");

  const supportTickets = [
    {
      id: "SUP-001",
      customer: "Sarah Johnson",
      type: "Product Inquiry",
      priority: "medium",
      status: "open",
      subject: "Nutritional information for organic bananas",
      created: "2 hours ago",
      lastResponse: "45 min ago",
      channel: "chat",
    },
    {
      id: "SUP-002",
      customer: "Mike Chen",
      type: "Cart Issue",
      priority: "high",
      status: "in-progress",
      subject: "Digital cart not syncing items",
      created: "30 min ago",
      lastResponse: "5 min ago",
      channel: "phone",
    },
    {
      id: "SUP-003",
      customer: "Emma Davis",
      type: "Payment",
      priority: "urgent",
      status: "escalated",
      subject: "Transaction failed but amount deducted",
      created: "15 min ago",
      lastResponse: "2 min ago",
      channel: "video",
    },
    {
      id: "SUP-004",
      customer: "James Wilson",
      type: "General",
      priority: "low",
      status: "resolved",
      subject: "Store hours inquiry",
      created: "1 day ago",
      lastResponse: "6 hours ago",
      channel: "chat",
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "high":
        return <Badge variant="warning">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="warning">Open</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "escalated":
        return <Badge variant="destructive">Escalated</Badge>;
      case "resolved":
        return <Badge variant="success">Resolved</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "chat":
        return <MessageSquare className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Customer Support Console
          </h1>
          <p className="text-muted-foreground">
            Manage customer inquiries and provide assistance across all channels
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Call Queue
          </Button>
          <Button variant="walmart">
            <MessageSquare className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 text-warning" />
              <span className="text-xs text-warning">2 urgent</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4m 23s</div>
            <div className="text-xs text-success mt-1">-15% today</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="text-xs text-success mt-1">+2.1% this week</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground mt-1">of 15 total</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <div className="text-xs text-success mt-1">+0.2 this month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Support Tickets Table */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Headphones className="h-5 w-5" />
              Support Tickets
            </CardTitle>
            <CardDescription>
              Manage and respond to customer support requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supportTickets.map((ticket) => (
                    <TableRow 
                      key={ticket.id}
                      className={ticket.priority === "urgent" ? "bg-destructive/5" : ""}
                    >
                      <TableCell>
                        <div>
                          <div className="font-mono text-sm">{ticket.id}</div>
                          <div className="text-xs text-muted-foreground">
                            {ticket.created}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {ticket.customer}
                        </div>
                      </TableCell>
                      <TableCell>{ticket.type}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getChannelIcon(ticket.channel)}
                          <span className="capitalize">{ticket.channel}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedTicket(ticket.id)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Ticket {ticket.id}</DialogTitle>
                              <DialogDescription>
                                {ticket.subject}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex gap-4">
                                <div className="flex-1">
                                  <label className="text-sm font-medium">Customer</label>
                                  <p className="text-sm text-muted-foreground">{ticket.customer}</p>
                                </div>
                                <div className="flex-1">
                                  <label className="text-sm font-medium">Priority</label>
                                  <div className="mt-1">{getPriorityBadge(ticket.priority)}</div>
                                </div>
                              </div>
                              <div className="h-64 border rounded-md p-4 bg-muted/20 overflow-y-auto">
                                <div className="space-y-3">
                                  <div className="p-3 bg-card rounded-md">
                                    <p className="text-sm"><strong>Customer:</strong> {ticket.subject}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{ticket.created}</p>
                                  </div>
                                  <div className="p-3 bg-primary/10 rounded-md ml-8">
                                    <p className="text-sm"><strong>Support:</strong> Hello! I'd be happy to help you with that. Let me look into this for you.</p>
                                    <p className="text-xs text-muted-foreground mt-1">{ticket.lastResponse}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Textarea 
                                  placeholder="Type your response..."
                                  value={chatMessage}
                                  onChange={(e) => setChatMessage(e.target.value)}
                                  className="flex-1"
                                />
                                <Button>
                                  <Send className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Tools */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Support Tools</CardTitle>
            <CardDescription>
              Quick actions and escalation options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Video className="mr-2 h-4 w-4" />
                Start Video Call
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="mr-2 h-4 w-4" />
                Transfer to Manager
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="mr-2 h-4 w-4" />
                Escalate to Technical
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Resolved
              </Button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Recent Resolutions</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <p className="font-medium">Cart sync issue</p>
                  <p className="text-xs text-muted-foreground">Resolved 2 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Payment refund</p>
                  <p className="text-xs text-muted-foreground">Resolved 4 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Product availability</p>
                  <p className="text-xs text-muted-foreground">Resolved 6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}