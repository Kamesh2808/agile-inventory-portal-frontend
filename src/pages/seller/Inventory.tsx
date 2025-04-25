
import { useState } from "react";
import SellerLayout from "@/components/layouts/SellerLayout";
import DataTable from "@/components/common/DataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import StatCard from "@/components/common/StatCard";
import { Package, AlertTriangle, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data
const inventoryItems = [
  {
    id: 1,
    sku: "PROD-001",
    name: "Smartphone X",
    category: "Electronics",
    quantity: 25,
    reorderLevel: 10,
    status: "In Stock",
    batchNumber: "BATCH-1001",
    expiryDate: "2026-04-25",
  },
  {
    id: 2,
    sku: "PROD-002",
    name: "Laptop Pro",
    category: "Electronics",
    quantity: 10,
    reorderLevel: 15,
    status: "Low Stock",
    batchNumber: "BATCH-1002",
    expiryDate: null,
  },
  {
    id: 3,
    sku: "PROD-003",
    name: "T-shirt Basic",
    category: "Clothing",
    quantity: 40,
    reorderLevel: 30,
    status: "In Stock",
    batchNumber: "BATCH-1003",
    expiryDate: null,
  },
  {
    id: 4,
    sku: "PROD-004",
    name: "Coffee Premium",
    category: "Food",
    quantity: 15,
    reorderLevel: 20,
    status: "In Stock",
    batchNumber: "BATCH-1004",
    expiryDate: "2025-10-15",
  },
  {
    id: 5,
    sku: "PROD-005",
    name: "Novel Bestseller",
    category: "Books",
    quantity: 25,
    reorderLevel: 15,
    status: "In Stock",
    batchNumber: "BATCH-1005",
    expiryDate: null,
  },
  {
    id: 6,
    sku: "PROD-006",
    name: "Tablet Mini",
    category: "Electronics",
    quantity: 0,
    reorderLevel: 10,
    status: "Out of Stock",
    batchNumber: "BATCH-1006",
    expiryDate: null,
  },
  {
    id: 7,
    sku: "PROD-007",
    name: "Wireless Headphones",
    category: "Electronics",
    quantity: 3,
    reorderLevel: 12,
    status: "Low Stock",
    batchNumber: "BATCH-1007",
    expiryDate: null,
  },
];

const SellerInventory = () => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [inventory] = useState(inventoryItems);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  // Filter inventory based on selected filters and search text
  const filteredInventory = inventory.filter((item) => {
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    const matchesSearch = 
      searchText === "" || 
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchText.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(searchText.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Calculate inventory stats
  const totalItems = inventory.reduce((acc, item) => acc + item.quantity, 0);
  const lowStockItems = inventory.filter((item) => item.status === "Low Stock").length;
  const outOfStockItems = inventory.filter((item) => item.status === "Out of Stock").length;

  // Handle item click for details
  const handleItemClick = (item: any) => {
    setCurrentItem(item);
    setIsDetailsOpen(true);
  };

  return (
    <SellerLayout title="Inventory">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <Button asChild className="bg-smis-secondary">
          <a href="/seller/request-stock">Request Stock</a>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <StatCard
          title="Total Inventory"
          value={`${totalItems} units`}
          icon={<Package className="text-smis-secondary" size={18} />}
          description="Across all products"
        />
        <StatCard
          title="Low Stock Items"
          value={`${lowStockItems} products`}
          icon={<AlertTriangle className="text-amber-500" size={18} />}
          description="Below reorder level"
        />
        <StatCard
          title="Out of Stock"
          value={`${outOfStockItems} products`}
          icon={<Calendar className="text-red-500" size={18} />}
          description="Needs immediate attention"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>
            Manage your store inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input 
                placeholder="Search by name, SKU, or batch..." 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[180px]">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[180px]">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DataTable
            data={filteredInventory}
            columns={[
              { key: "sku", header: "SKU" },
              { key: "name", header: "Name" },
              { key: "category", header: "Category" },
              { key: "quantity", header: "Quantity" },
              { key: "batchNumber", header: "Batch #" },
              {
                key: "status",
                header: "Status",
                render: (item) => {
                  let badgeClass = "";
                  if (item.status === "In Stock") badgeClass = "bg-green-100 text-green-800 hover:bg-green-100";
                  else if (item.status === "Out of Stock") badgeClass = "bg-red-100 text-red-800 hover:bg-red-100";
                  else if (item.status === "Low Stock") badgeClass = "bg-amber-100 text-amber-800 hover:bg-amber-100";
                  
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick(item);
                    }}
                  >
                    View Details
                  </Button>
                ),
              },
            ]}
            onRowClick={handleItemClick}
            searchable
          />
        </CardContent>
      </Card>

      {/* Item Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Detailed information about this inventory item
            </DialogDescription>
          </DialogHeader>
          {currentItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">SKU:</div>
                <div className="col-span-2">{currentItem.sku}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Name:</div>
                <div className="col-span-2">{currentItem.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Category:</div>
                <div className="col-span-2">{currentItem.category}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Quantity:</div>
                <div className="col-span-2">{currentItem.quantity}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Reorder Level:</div>
                <div className="col-span-2">{currentItem.reorderLevel}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Status:</div>
                <div className="col-span-2">
                  <Badge
                    variant="outline"
                    className={
                      currentItem.status === "In Stock"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : currentItem.status === "Out of Stock"
                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                    }
                  >
                    {currentItem.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Batch Number:</div>
                <div className="col-span-2">{currentItem.batchNumber}</div>
              </div>
              {currentItem.expiryDate && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Expiry Date:</div>
                  <div className="col-span-2">{currentItem.expiryDate}</div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
            {currentItem && (currentItem.status === "Low Stock" || currentItem.status === "Out of Stock") && (
              <Button asChild className="bg-smis-secondary">
                <a href="/seller/request-stock">Request Stock</a>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SellerLayout>
  );
};

export default SellerInventory;
