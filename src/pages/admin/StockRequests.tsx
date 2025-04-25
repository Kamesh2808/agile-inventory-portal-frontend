
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable";
import { useToast } from "@/components/ui/use-toast";
import StatusBadge from "@/components/common/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const initialRequests = [
  {
    id: 1,
    requestId: "REQ-001",
    seller: "Store A",
    product: "Smartphone X",
    quantity: 15,
    requestDate: "2025-04-22",
    status: "pending",
    notes: "Urgent request for weekend promotion"
  },
  {
    id: 2,
    requestId: "REQ-002",
    seller: "Store B",
    product: "Laptop Pro",
    quantity: 5,
    requestDate: "2025-04-21",
    status: "approved",
    notes: ""
  },
  {
    id: 3,
    requestId: "REQ-003",
    seller: "Store C",
    product: "T-shirt Basic",
    quantity: 50,
    requestDate: "2025-04-20",
    status: "rejected",
    notes: "Out of stock at warehouse"
  },
  {
    id: 4,
    requestId: "REQ-004",
    seller: "Store A",
    product: "Wireless Headphones",
    quantity: 10,
    requestDate: "2025-04-20",
    status: "pending",
    notes: ""
  },
  {
    id: 5,
    requestId: "REQ-005",
    seller: "Store D",
    product: "Coffee Premium",
    quantity: 20,
    requestDate: "2025-04-19",
    status: "completed",
    notes: "Delivered on 2025-04-24"
  },
];

const StockRequests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<any>(null);
  const [approvalNotes, setApprovalNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const { toast } = useToast();

  // Open request details dialog
  const handleViewClick = (request: any) => {
    setCurrentRequest(request);
    setIsDetailsOpen(true);
  };

  // Open approve request dialog
  const handleApproveClick = (request: any) => {
    setCurrentRequest(request);
    setApprovalNotes("");
    setIsApproveOpen(true);
  };

  // Open reject request dialog
  const handleRejectClick = (request: any) => {
    setCurrentRequest(request);
    setRejectionReason("");
    setIsRejectOpen(true);
  };

  // Approve request
  const handleApproveRequest = () => {
    const updatedRequests = requests.map((request) => {
      if (request.id === currentRequest.id) {
        return {
          ...request,
          status: "approved",
          notes: approvalNotes ? approvalNotes : request.notes,
        };
      }
      return request;
    });

    setRequests(updatedRequests);
    setIsApproveOpen(false);
    
    toast({
      title: "Request approved",
      description: `Stock request ${currentRequest.requestId} has been approved.`,
    });
  };

  // Reject request
  const handleRejectRequest = () => {
    const updatedRequests = requests.map((request) => {
      if (request.id === currentRequest.id) {
        return {
          ...request,
          status: "rejected",
          notes: rejectionReason,
        };
      }
      return request;
    });

    setRequests(updatedRequests);
    setIsRejectOpen(false);
    
    toast({
      title: "Request rejected",
      description: `Stock request ${currentRequest.requestId} has been rejected.`,
      variant: "destructive",
    });
  };

  // Filter requests by status
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredRequests = requests.filter((request) => {
    return statusFilter === "all" || request.status === statusFilter;
  });

  return (
    <AdminLayout title="Stock Requests">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Stock Requests</h2>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stock Requests</CardTitle>
          <CardDescription>Manage stock requests from sellers</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredRequests}
            columns={[
              { key: "requestId", header: "Request ID" },
              { key: "seller", header: "Seller" },
              { key: "product", header: "Product" },
              { key: "quantity", header: "Quantity" },
              { key: "requestDate", header: "Request Date" },
              {
                key: "status",
                header: "Status",
                render: (item) => <StatusBadge status={item.status} />,
              },
              {
                key: "actions",
                header: "Actions",
                render: (item) => (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewClick(item);
                      }}
                    >
                      View
                    </Button>
                    {item.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApproveClick(item);
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRejectClick(item);
                          }}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                ),
              },
            ]}
            searchable
          />
        </CardContent>
      </Card>

      {/* Request Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>
          {currentRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Request ID:</div>
                <div className="col-span-2">{currentRequest.requestId}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Seller:</div>
                <div className="col-span-2">{currentRequest.seller}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Product:</div>
                <div className="col-span-2">{currentRequest.product}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Quantity:</div>
                <div className="col-span-2">{currentRequest.quantity}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Request Date:</div>
                <div className="col-span-2">{currentRequest.requestDate}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Status:</div>
                <div className="col-span-2">
                  <StatusBadge status={currentRequest.status} />
                </div>
              </div>
              {currentRequest.notes && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Notes:</div>
                  <div className="col-span-2">{currentRequest.notes}</div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Request Dialog */}
      <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Stock Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this stock request?
            </DialogDescription>
          </DialogHeader>
          {currentRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Request ID:</div>
                <div className="col-span-2">{currentRequest.requestId}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Product:</div>
                <div className="col-span-2">{currentRequest.product}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Quantity:</div>
                <div className="col-span-2">{currentRequest.quantity}</div>
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="approval-notes">Notes (Optional)</Label>
                <Textarea
                  id="approval-notes"
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  placeholder="Add any notes or comments"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-smis-primary hover:bg-smis-primary/90"
              onClick={handleApproveRequest}
            >
              Approve Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Request Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Stock Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request.
            </DialogDescription>
          </DialogHeader>
          {currentRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Request ID:</div>
                <div className="col-span-2">{currentRequest.requestId}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Product:</div>
                <div className="col-span-2">{currentRequest.product}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Quantity:</div>
                <div className="col-span-2">{currentRequest.quantity}</div>
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="rejection-reason">Reason for Rejection</Label>
                <Textarea
                  id="rejection-reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Explain why this request is being rejected"
                  rows={3}
                  required
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectRequest}
              disabled={!rejectionReason.trim()}
            >
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default StockRequests;
