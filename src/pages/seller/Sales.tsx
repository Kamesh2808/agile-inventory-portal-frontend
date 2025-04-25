
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, Loader2, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data
const inventory = [
  { 
    id: 1, 
    name: "Smartphone X", 
    price: 999.99, 
    quantity: 5,
    batches: [
      { id: 101, batchNumber: "B-SM-2023-05", quantity: 3, expiry: "2025-05-15" },
      { id: 102, batchNumber: "B-SM-2023-11", quantity: 2, expiry: "2025-11-20" },
    ] 
  },
  { 
    id: 2, 
    name: "Laptop Pro", 
    price: 1999.99, 
    quantity: 8,
    batches: [
      { id: 201, batchNumber: "B-LP-2023-06", quantity: 5, expiry: "2026-06-10" },
      { id: 202, batchNumber: "B-LP-2024-01", quantity: 3, expiry: "2026-01-15" },
    ] 
  },
  { 
    id: 3, 
    name: "T-shirt Basic", 
    price: 24.99, 
    quantity: 15,
    batches: [
      { id: 301, batchNumber: "B-TB-2023-04", quantity: 8, expiry: "2025-04-30" },
      { id: 302, batchNumber: "B-TB-2024-02", quantity: 7, expiry: "2026-02-28" },
    ] 
  },
  { 
    id: 4, 
    name: "Coffee Premium", 
    price: 19.99, 
    quantity: 5,
    batches: [
      { id: 401, batchNumber: "B-CP-2023-12", quantity: 5, expiry: "2024-06-30" },
    ] 
  },
  { 
    id: 5, 
    name: "Wireless Headphones", 
    price: 149.99, 
    quantity: 3,
    batches: [
      { id: 501, batchNumber: "B-WH-2023-10", quantity: 3, expiry: "2025-10-15" },
    ] 
  },
];

type SaleItem = {
  id: number;
  productId: number;
  name: string;
  batchId: number;
  batchNumber: string;
  price: number;
  quantity: number;
  total: number;
};

const Sales = () => {
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  // Get available batches for selected product
  const getAvailableBatches = () => {
    const product = inventory.find(p => p.name === selectedProduct);
    return product ? product.batches : [];
  };

  // Get price for selected product
  const getCurrentPrice = () => {
    const product = inventory.find(p => p.name === selectedProduct);
    return product ? product.price.toString() : "";
  };

  // Get max quantity for selected batch
  const getMaxQuantity = () => {
    const product = inventory.find(p => p.name === selectedProduct);
    if (!product) return 0;
    
    const batch = product.batches.find(b => b.batchNumber === selectedBatch);
    return batch ? batch.quantity : 0;
  };

  // Update price when product changes
  const handleProductChange = (value: string) => {
    setSelectedProduct(value);
    setSelectedBatch("");
    setQuantity("");
    
    const product = inventory.find(p => p.name === value);
    if (product) {
      setPrice(product.price.toString());
    } else {
      setPrice("");
    }
  };

  // Add item to sale
  const handleAddItem = () => {
    if (!selectedProduct || !selectedBatch || !quantity || !price) {
      toast({
        title: "Missing information",
        description: "Please complete all fields before adding the item.",
        variant: "destructive",
      });
      return;
    }

    const product = inventory.find(p => p.name === selectedProduct);
    if (!product) return;
    
    const batch = product.batches.find(b => b.batchNumber === selectedBatch);
    if (!batch) return;
    
    const quantityNum = parseInt(quantity);
    const priceNum = parseFloat(price);
    
    if (quantityNum > batch.quantity) {
      toast({
        title: "Not enough stock",
        description: `Only ${batch.quantity} items available in this batch.`,
        variant: "destructive",
      });
      return;
    }

    setSaleItems([
      ...saleItems,
      {
        id: Date.now(),
        productId: product.id,
        name: selectedProduct,
        batchId: batch.id,
        batchNumber: selectedBatch,
        price: priceNum,
        quantity: quantityNum,
        total: priceNum * quantityNum,
      },
    ]);

    // Reset form
    setSelectedProduct("");
    setSelectedBatch("");
    setQuantity("");
    setPrice("");
  };

  // Remove item from sale
  const handleRemoveItem = (id: number) => {
    setSaleItems(saleItems.filter(item => item.id !== id));
  };

  // Calculate total
  const calculateTotal = () => {
    return saleItems.reduce((sum, item) => sum + item.total, 0);
  };

  // Handle submit sale
  const handleSubmitSale = () => {
    if (saleItems.length === 0) {
      toast({
        title: "Empty sale",
        description: "Please add at least one item to the sale.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      
      toast({
        title: "Sale recorded",
        description: `Sale for $${calculateTotal().toFixed(2)} has been recorded successfully.`,
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setSaleItems([]);
        setCustomerName("");
        setCustomerPhone("");
        setPaymentMethod("cash");
        setIsComplete(false);
      }, 2000);
    }, 1500);
  };

  return (
    <SellerLayout title="Record Sale">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left column - Sale Form */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Sale Details</CardTitle>
            <CardDescription>Add items to the current sale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Product Selection */}
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select
                  value={selectedProduct}
                  onValueChange={handleProductChange}
                  disabled={isSubmitting || isComplete}
                >
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {inventory.map((product) => (
                      <SelectItem key={product.id} value={product.name}>
                        <div className="flex justify-between items-center w-full">
                          <span>{product.name}</span>
                          <span className="text-xs text-muted-foreground">
                            (Stock: {product.quantity})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Batch Selection */}
              {selectedProduct && (
                <div className="space-y-2">
                  <Label htmlFor="batch">Batch</Label>
                  <Select
                    value={selectedBatch}
                    onValueChange={setSelectedBatch}
                    disabled={isSubmitting || isComplete}
                  >
                    <SelectTrigger id="batch">
                      <SelectValue placeholder="Select a batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableBatches().map((batch) => (
                        <SelectItem key={batch.id} value={batch.batchNumber}>
                          <div className="flex justify-between items-center w-full">
                            <span>{batch.batchNumber}</span>
                            <span className="text-xs text-muted-foreground">
                              (Qty: {batch.quantity}, Exp: {batch.expiry})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Quantity and Price */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={getMaxQuantity()}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 1"
                    disabled={!selectedBatch || isSubmitting || isComplete}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Unit Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 19.99"
                    disabled={isSubmitting || isComplete}
                  />
                </div>
              </div>

              {/* Add Button */}
              <Button 
                onClick={handleAddItem} 
                className="w-full bg-smis-secondary"
                disabled={!selectedProduct || !selectedBatch || !quantity || !price || isSubmitting || isComplete}
              >
                <Plus size={18} className="mr-2" /> Add to Sale
              </Button>

              {/* Sale Items */}
              <div className="space-y-2 mt-6">
                <Label>Sale Items</Label>
                {saleItems.length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="py-2 px-3 text-left text-xs font-medium">Product</th>
                          <th className="py-2 px-3 text-left text-xs font-medium">Qty</th>
                          <th className="py-2 px-3 text-left text-xs font-medium">Price</th>
                          <th className="py-2 px-3 text-left text-xs font-medium">Total</th>
                          <th className="py-2 px-3 text-left text-xs font-medium w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {saleItems.map((item) => (
                          <tr key={item.id} className="border-t">
                            <td className="py-2 px-3 text-sm">{item.name}</td>
                            <td className="py-2 px-3 text-sm">{item.quantity}</td>
                            <td className="py-2 px-3 text-sm">${item.price.toFixed(2)}</td>
                            <td className="py-2 px-3 text-sm">${item.total.toFixed(2)}</td>
                            <td className="py-2 px-3 text-sm">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(item.id)}
                                className="h-6 w-6"
                                disabled={isSubmitting || isComplete}
                              >
                                <X size={16} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t bg-muted/30">
                          <td className="py-2 px-3 text-sm font-medium" colSpan={3}>
                            Total
                          </td>
                          <td className="py-2 px-3 text-sm font-medium" colSpan={2}>
                            ${calculateTotal().toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="border rounded-md py-8 text-center text-sm text-muted-foreground bg-muted/10">
                    No items added yet
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right column - Customer Info & Payment */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Customer & Payment</CardTitle>
            <CardDescription>Enter customer details and complete sale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name (Optional)</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. John Smith"
                  disabled={isSubmitting || isComplete}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerPhone">Customer Phone (Optional)</Label>
                <Input
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. (123) 456-7890"
                  disabled={isSubmitting || isComplete}
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  disabled={isSubmitting || isComplete}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="debit">Debit Card</SelectItem>
                    <SelectItem value="mobile">Mobile Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sale Summary */}
              <Card className="bg-muted/30 border">
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-2">Sale Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Items:</span>
                      <span>{saleItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (included):</span>
                      <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-1 border-t mt-1">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Complete Sale Button */}
              <Button 
                onClick={handleSubmitSale} 
                className="w-full bg-smis-primary h-12"
                disabled={saleItems.length === 0 || isSubmitting || isComplete}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" /> Processing...
                  </>
                ) : isComplete ? (
                  <>
                    <Check size={18} className="mr-2" /> Sale Complete
                  </>
                ) : (
                  "Complete Sale"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  );
};

export default Sales;
