
import { useState } from "react";
import SellerLayout from "@/components/layouts/SellerLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// Mock data
const salesData = [
  {
    id: 1,
    invoiceNumber: "INV-001",
    date: "2025-04-25",
    customer: "Walk-in",
    items: [
      { name: "Smartphone X", quantity: 2, price: 999.99 },
      { name: "Wireless Headphones", quantity: 1, price: 149.99 }
    ],
    total: 2149.97,
    paymentMethod: "Credit Card",
    status: "completed",
  },
  {
    id: 2,
    invoiceNumber: "INV-002",
    date: "2025-04-24",
    customer: "John Smith",
    items: [
      { name: "Laptop Pro", quantity: 1, price: 1999.99 }
    ],
    total: 1999.99,
    paymentMethod: "Cash",
    status: "completed",
  },
  {
    id: 3,
    invoiceNumber: "INV-003",
    date: "2025-04-23",
    customer: "Sarah Johnson",
    items: [
      { name: "T-shirt Basic", quantity: 3, price: 24.99 },
      { name: "Novel Bestseller", quantity: 1, price: 14.99 }
    ],
    total: 89.96,
    paymentMethod: "Credit Card",
    status: "completed",
  },
  {
    id: 4,
    invoiceNumber: "INV-004",
    date: "2025-04-22",
    customer: "Mike Williams",
    items: [
      { name: "Coffee Premium", quantity: 2, price: 19.99 }
    ],
    total: 39.98,
    paymentMethod: "Cash",
    status: "refunded",
  },
  {
    id: 5,
    invoiceNumber: "INV-005",
    date: "2025-04-22",
    customer: "Emma Brown",
    items: [
      { name: "Smartphone X", quantity: 1, price: 999.99 },
      { name: "T-shirt Basic", quantity: 2, price: 24.99 }
    ],
    total: 1049.97,
    paymentMethod: "Credit Card",
    status: "completed",
  },
  {
    id: 6,
    invoiceNumber: "INV-006",
    date: "2025-04-21",
    customer: "James Wilson",
    items: [
      { name: "Novel Bestseller", quantity: 3, price: 14.99 }
    ],
    total: 44.97,
    paymentMethod: "Cash",
    status: "completed",
  },
  {
    id: 7,
    invoiceNumber: "INV-007",
    date: "2025-04-20",
    customer: "Walk-in",
    items: [
      { name: "Tablet Mini", quantity: 1, price: 499.99 }
    ],
    total: 499.99,
    paymentMethod: "Credit Card",
    status: "refunded",
  },
];

const SalesHistory = () => {
  const [sales] = useState(salesData);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentSale, setCurrentSale] = useState<any>(null);

  // Filter sales based on selected filters and date
  const filteredSales = sales.filter((sale) => {
    const matchesStatus = filterStatus === "all" || sale.status === filterStatus;
    const matchesPayment = filterPayment === "all" || sale.paymentMethod === filterPayment;
    const matchesDate = !date || sale.date === format(date, "yyyy-MM-dd");
    
    return matchesStatus && matchesPayment && matchesDate;
  });

  // Calculate total sales and refunds
  const totalSales = filteredSales
    .filter((sale) => sale.status === "completed")
    .reduce((acc, sale) => acc + sale.total, 0);
  
  const totalRefunds = filteredSales
    .filter((sale) => sale.status === "refunded")
    .reduce((acc, sale) => acc + sale.total, 0);

  // Handle sale click for details
  const handleSaleClick = (sale: any) => {
    setCurrentSale(sale);
    setIsDetailsOpen(true);
  };

  // Clear date filter
  const clearDateFilter = () => {
    setDate(undefined);
  };

  return (
    <SellerLayout title="Sales History">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sales History</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download size={16} className="mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {filteredSales.filter((sale) => sale.status === "completed").length} completed transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRefunds.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {filteredSales.filter((sale) => sale.status === "refunded").length} refunded transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalSales - totalRefunds).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              After refunds and adjustments
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Records</CardTitle>
          <CardDescription>
            View and manage your complete sales history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-[180px]">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[180px]">
              <Select value={filterPayment} onValueChange={setFilterPayment}>
                <SelectTrigger>
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[180px]">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PP") : <span>Filter by date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                  {date && (
                    <div className="p-3 border-t border-border">
                      <Button variant="ghost" size="sm" onClick={clearDateFilter}>
                        Clear
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DataTable
            data={filteredSales}
            columns={[
              { key: "invoiceNumber", header: "Invoice #" },
              { key: "date", header: "Date" },
              { key: "customer", header: "Customer" },
              {
                key: "total",
                header: "Total",
                render: (item) => `$${item.total.toFixed(2)}`,
              },
              { key: "paymentMethod", header: "Payment" },
              {
                key: "status",
                header: "Status",
                render: (item) => (
                  <Badge
                    variant="outline"
                    className={
                      item.status === "completed"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {item.status === "completed" ? "Completed" : "Refunded"}
                  </Badge>
                ),
              },
              {
                key: "actions",
                header: "Actions",
                render: (item) => (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaleClick(item);
                    }}
                  >
                    View Details
                  </Button>
                ),
              },
            ]}
            onRowClick={handleSaleClick}
            searchable
          />
        </CardContent>
      </Card>

      {/* Sale Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sale Details</DialogTitle>
            <DialogDescription>
              Invoice #{currentSale?.invoiceNumber}
            </DialogDescription>
          </DialogHeader>
          {currentSale && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{currentSale.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p>{currentSale.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                  <p>{currentSale.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge
                    variant="outline"
                    className={
                      currentSale.status === "completed"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {currentSale.status === "completed" ? "Completed" : "Refunded"}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Items</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Item</th>
                      <th className="text-center py-2">Qty</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSale.items.map((item: any, index: number) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{item.name}</td>
                        <td className="text-center py-2">{item.quantity}</td>
                        <td className="text-right py-2">${item.price.toFixed(2)}</td>
                        <td className="text-right py-2">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="font-medium">
                      <td colSpan={3} className="text-right py-4">Total</td>
                      <td className="text-right py-4">${currentSale.total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
            <Button variant="outline" className="flex items-center">
              <Download size={16} className="mr-2" /> Export Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SellerLayout>
  );
};

export default SalesHistory;
