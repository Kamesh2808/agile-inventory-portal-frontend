
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
import { Textarea } from "@/components/ui/textarea";
import DataTable from "@/components/common/DataTable";
import StatusBadge from "@/components/common/StatusBadge";
import { Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data
const products = [
  { id: 1, name: "Smartphone X", currentStock: 2, minStock: 5 },
  { id: 2, name: "Laptop Pro", currentStock: 8, minStock: 5 },
  { id: 3, name: "T-shirt Basic", currentStock: 15, minStock: 20 },
  { id: 4, name: "Coffee Premium", currentStock: 5, minStock: 10 },
  { id: 5, name: "Wireless Headphones", currentStock: 1, minStock: 8 },
];

const existingRequests = [
  {
    id: 1,
    date: "2025-04-22",
    items: [
      { product: "Smartphone X", quantity: 10 }
    ],
    status: "approved" as const,
    notes: "Regular restock",
  },
  {
    id: 2,
    date: "2025-04-24",
    items: [
      { product: "Laptop Pro", quantity: 5 },
      { product: "Wireless Headphones", quantity: 15 }
    ],
    status: "pending" as const,
    notes: "Urgent - stock is very low",
  },
  {
    id: 3,
    date: "2025-04-18",
    items: [
      { product: "T-shirt Basic", quantity: 25 },
      { product: "Coffee Premium", quantity: 20 }
    ],
    status: "completed" as const,
    notes: "",
  },
];

type RequestItem = {
  id: number;
  product: string;
  quantity: number;
};

const RequestStock = () => {
  const [requestItems, setRequestItems] = useState<RequestItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleAddItem = () => {
    if (!selectedProduct || !quantity) {
      toast({
        title: "Missing information",
        description: "Please select a product and specify quantity.",
        variant: "destructive",
      });
      return;
    }

    const productObj = products.find(p => p.name === selectedProduct);
    if (!productObj) return;

    setRequestItems([
      ...requestItems,
      {
        id: Date.now(),
        product: selectedProduct,
        quantity: parseInt(quantity),
      },
    ]);

    // Reset form
    setSelectedProduct("");
    setQuantity("");
  };

  const handleRemoveItem = (id: number) => {
    setRequestItems(requestItems.filter(item => item.id !== id));
  };

  const handleSubmitRequest = () => {
    if (requestItems.length === 0) {
      toast({
        title: "Empty request",
        description: "Please add at least one product to your request.",
        variant: "destructive",
      });
      return;
    }

    // Here you would submit the request to the backend
    // For demo purposes, we'll just show a success message
    toast({
      title: "Stock request submitted",
      description: `Your request for ${requestItems.length} products has been sent for approval.`,
    });

    // Reset form
    setRequestItems([]);
    setNotes("");
  };

  return (
    <SellerLayout title="Request Stock">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>New Request</CardTitle>
            <CardDescription>Request stock from the admin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Product Selection */}
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select
                  value={selectedProduct}
                  onValueChange={setSelectedProduct}
                >
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.name}>
                        <div className="flex justify-between items-center w-full">
                          <span>{product.name}</span>
                          <span className="text-xs text-muted-foreground">
                            (Stock: {product.currentStock})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>

              {/* Add Button */}
              <Button 
                onClick={handleAddItem} 
                className="w-full bg-smis-secondary"
              >
                <Plus size={18} className="mr-2" /> Add to Request
              </Button>

              {/* Request Items */}
              <div className="space-y-2">
                <Label>Request Items</Label>
                {requestItems.length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="py-2 px-3 text-left text-xs font-medium">Product</th>
                          <th className="py-2 px-3 text-left text-xs font-medium">Qty</th>
                          <th className="py-2 px-3 text-left text-xs font-medium w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {requestItems.map((item) => (
                          <tr key={item.id} className="border-t">
                            <td className="py-2 px-3 text-sm">{item.product}</td>
                            <td className="py-2 px-3 text-sm">{item.quantity}</td>
                            <td className="py-2 px-3 text-sm">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(item.id)}
                                className="h-6 w-6"
                              >
                                <X size={16} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="border rounded-md py-8 text-center text-sm text-muted-foreground bg-muted/10">
                    No items added yet
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional information here..."
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button 
                onClick={handleSubmitRequest} 
                className="w-full bg-smis-primary"
                disabled={requestItems.length === 0}
              >
                Submit Stock Request
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Request History</CardTitle>
            <CardDescription>View your previous stock requests</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={existingRequests}
              columns={[
                { key: "date", header: "Date" },
                { 
                  key: "items",
                  header: "Products",
                  render: (item) => (
                    <div>
                      {item.items.map((i, index) => (
                        <div key={index} className="text-sm">
                          {i.product} (Qty: {i.quantity})
                        </div>
                      ))}
                    </div>
                  )
                },
                {
                  key: "status",
                  header: "Status",
                  render: (item) => <StatusBadge status={item.status} />
                },
                {
                  key: "notes",
                  header: "Notes",
                  render: (item) => item.notes || "—"
                },
              ]}
              searchable
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Low Stock Products</CardTitle>
          <CardDescription>Products below recommended stock levels</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={products.filter(p => p.currentStock < p.minStock)}
            columns={[
              { key: "name", header: "Product Name" },
              { key: "currentStock", header: "Current Stock" },
              { key: "minStock", header: "Min. Stock Level" },
              {
                key: "actions",
                header: "Actions",
                render: (item) => (
                  <Button
                    size="sm"
                    className="bg-smis-secondary text-xs"
                    onClick={() => {
                      setSelectedProduct(item.name);
                      setQuantity((item.minStock - item.currentStock).toString());
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Quick Add
                  </Button>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
    </SellerLayout>
  );
};

export default RequestStock;
