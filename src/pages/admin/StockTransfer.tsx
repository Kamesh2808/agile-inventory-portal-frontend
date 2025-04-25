
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import DataTable from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Mock data
const products = [
  { id: 1, name: "Smartphone X", sku: "PROD-001", availableStock: 20 },
  { id: 2, name: "Laptop Pro", sku: "PROD-002", availableStock: 10 },
  { id: 3, name: "T-shirt Basic", sku: "PROD-003", availableStock: 40 },
  { id: 4, name: "Coffee Premium", sku: "PROD-004", availableStock: 15 },
  { id: 5, name: "Novel Bestseller", sku: "PROD-005", availableStock: 25 },
];

const sellers = [
  { id: 1, name: "Store A", location: "Downtown" },
  { id: 2, name: "Store B", location: "Uptown" },
  { id: 3, name: "Store C", location: "Midtown" },
  { id: 4, name: "Store D", location: "Suburb" },
];

const transferHistory = [
  {
    id: 1,
    transferId: "TRF-001",
    product: "Smartphone X",
    quantity: 5,
    seller: "Store A",
    date: "2025-04-22",
    status: "completed",
  },
  {
    id: 2,
    transferId: "TRF-002",
    product: "Laptop Pro",
    quantity: 3,
    seller: "Store B",
    date: "2025-04-21",
    status: "in-transit",
  },
  {
    id: 3,
    transferId: "TRF-003",
    product: "T-shirt Basic",
    quantity: 20,
    seller: "Store C",
    date: "2025-04-20",
    status: "completed",
  },
  {
    id: 4,
    transferId: "TRF-004",
    product: "Coffee Premium",
    quantity: 10,
    seller: "Store D",
    date: "2025-04-19",
    status: "completed",
  },
];

const StockTransfer = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedSeller, setSelectedSeller] = useState("");
  const [quantity, setQuantity] = useState("");
  const [batchNumber, setBatchNumber] = useState("BATCH-" + Math.floor(1000 + Math.random() * 9000));
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState("new");
  const [history, setHistory] = useState(transferHistory);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentTransfer, setCurrentTransfer] = useState<any>(null);
  const { toast } = useToast();

  // Product selection handler
  const handleProductChange = (value: string) => {
    setSelectedProduct(value);
  };

  // Seller selection handler
  const handleSellerChange = (value: string) => {
    setSelectedSeller(value);
  };

  // Quantity input handler
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
      setQuantity(value);
    }
  };

  // Get selected product's available stock
  const getAvailableStock = () => {
    const product = products.find(p => p.id === parseInt(selectedProduct));
    return product ? product.availableStock : 0;
  };

  // Check if form is valid
  const isFormValid = () => {
    if (!selectedProduct || !selectedSeller || !quantity) {
      return false;
    }
    const quantityNum = parseInt(quantity);
    const availableStock = getAvailableStock();
    return quantityNum > 0 && quantityNum <= availableStock;
  };

  // Handle transfer submission
  const handleTransfer = () => {
    if (!isFormValid()) return;

    const productName = products.find(p => p.id === parseInt(selectedProduct))?.name || "";
    const sellerName = sellers.find(s => s.id === parseInt(selectedSeller))?.name || "";
    
    // Create new transfer record
    const newTransfer = {
      id: history.length + 1,
      transferId: `TRF-00${history.length + 1}`,
      product: productName,
      quantity: parseInt(quantity),
      seller: sellerName,
      date: new Date().toISOString().split('T')[0],
      status: "pending" as const,
      batchNumber,
      notes,
    };

    // Update history
    setHistory([newTransfer, ...history]);
    
    // Reset form
    setSelectedProduct("");
    setSelectedSeller("");
    setQuantity("");
    setBatchNumber("BATCH-" + Math.floor(1000 + Math.random() * 9000));
    setNotes("");
    
    // Show success message
    toast({
      title: "Stock transfer initiated",
      description: `${quantity} units of ${productName} are being transferred to ${sellerName}.`,
    });
    
    // Switch to history tab
    setActiveTab("history");
  };

  // View transfer details
  const handleViewDetails = (transfer: any) => {
    setCurrentTransfer(transfer);
    setIsDetailOpen(true);
  };

  return (
    <AdminLayout title="Stock Transfer">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Stock Transfer</h2>
      </div>

      <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="new">New Transfer</TabsTrigger>
          <TabsTrigger value="history">Transfer History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>New Stock Transfer</CardTitle>
              <CardDescription>Transfer stock from warehouse to seller</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="product">Select Product</Label>
                  <Select value={selectedProduct} onValueChange={handleProductChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name} ({product.sku}) - {product.availableStock} available
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="seller">Select Seller</Label>
                  <Select value={selectedSeller} onValueChange={handleSellerChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a seller" />
                    </SelectTrigger>
                    <SelectContent>
                      {sellers.map((seller) => (
                        <SelectItem key={seller.id} value={seller.id.toString()}>
                          {seller.name} ({seller.location})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="Enter quantity"
                  />
                  {selectedProduct && parseInt(quantity) > getAvailableStock() && (
                    <p className="text-xs text-destructive">
                      Quantity exceeds available stock of {getAvailableStock()} units.
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="batch">Batch Number</Label>
                  <Input
                    id="batch"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    placeholder="Enter batch number"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any notes about this transfer"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleTransfer} 
                className="bg-smis-primary" 
                disabled={!isFormValid()}
              >
                Initiate Transfer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Transfer History</CardTitle>
              <CardDescription>View and track all stock transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={history}
                columns={[
                  { key: "transferId", header: "Transfer ID" },
                  { key: "product", header: "Product" },
                  { key: "quantity", header: "Quantity" },
                  { key: "seller", header: "Seller" },
                  { key: "date", header: "Date" },
                  {
                    key: "status",
                    header: "Status",
                    render: (item) => {
                      let badgeClass = "";
                      if (item.status === "completed") badgeClass = "bg-green-100 text-green-800 hover:bg-green-100";
                      else if (item.status === "pending") badgeClass = "bg-amber-100 text-amber-800 hover:bg-amber-100";
                      else if (item.status === "in-transit") badgeClass = "bg-blue-100 text-blue-800 hover:bg-blue-100";
                      
                      return <Badge variant="outline" className={badgeClass}>{item.status}</Badge>;
                    },
                  },
                  {
                    key: "actions",
                    header: "Actions",
                    render: (item) => (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(item)}
                      >
                        View
                      </Button>
                    ),
                  },
                ]}
                searchable
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transfer Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transfer Details</DialogTitle>
            <DialogDescription>
              Information about stock transfer
            </DialogDescription>
          </DialogHeader>
          {currentTransfer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Transfer ID:</div>
                <div className="col-span-2">{currentTransfer.transferId}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Product:</div>
                <div className="col-span-2">{currentTransfer.product}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Quantity:</div>
                <div className="col-span-2">{currentTransfer.quantity}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Seller:</div>
                <div className="col-span-2">{currentTransfer.seller}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Date:</div>
                <div className="col-span-2">{currentTransfer.date}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Status:</div>
                <div className="col-span-2">
                  <Badge
                    variant="outline"
                    className={
                      currentTransfer.status === "completed"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : currentTransfer.status === "pending"
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    }
                  >
                    {currentTransfer.status}
                  </Badge>
                </div>
              </div>
              {currentTransfer.batchNumber && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Batch Number:</div>
                  <div className="col-span-2">{currentTransfer.batchNumber}</div>
                </div>
              )}
              {currentTransfer.notes && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Notes:</div>
                  <div className="col-span-2">{currentTransfer.notes}</div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default StockTransfer;
