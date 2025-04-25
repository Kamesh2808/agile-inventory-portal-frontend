
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import DataTable from "@/components/common/DataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter, RefreshCw } from "lucide-react";
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
import { Package, AlertTriangle, TrendingUp } from "lucide-react";

// Mock data
const inventoryItems = [
  {
    id: 1,
    sku: "PROD-001",
    name: "Smartphone X",
    category: "Electronics",
    totalStock: 45,
    allocated: 25,
    available: 20,
    reorderLevel: 10,
    status: "In Stock",
    lastUpdated: "2025-04-22",
  },
  {
    id: 2,
    sku: "PROD-002",
    name: "Laptop Pro",
    category: "Electronics",
    totalStock: 28,
    allocated: 18,
    available: 10,
    reorderLevel: 15,
    status: "In Stock",
    lastUpdated: "2025-04-21",
  },
  {
    id: 3,
    sku: "PROD-003",
    name: "T-shirt Basic",
    category: "Clothing",
    totalStock: 120,
    allocated: 80,
    available: 40,
    reorderLevel: 30,
    status: "In Stock",
    lastUpdated: "2025-04-20",
  },
  {
    id: 4,
    sku: "PROD-004",
    name: "Coffee Premium",
    category: "Food",
    totalStock: 60,
    allocated: 45,
    available: 15,
    reorderLevel: 20,
    status: "In Stock",
    lastUpdated: "2025-04-19",
  },
  {
    id: 5,
    sku: "PROD-005",
    name: "Novel Bestseller",
    category: "Books",
    totalStock: 85,
    allocated: 60,
    available: 25,
    reorderLevel: 15,
    status: "In Stock",
    lastUpdated: "2025-04-18",
  },
  {
    id: 6,
    sku: "PROD-006",
    name: "Tablet Mini",
    category: "Electronics",
    totalStock: 0,
    allocated: 0,
    available: 0,
    reorderLevel: 10,
    status: "Out of Stock",
    lastUpdated: "2025-04-17",
  },
  {
    id: 7,
    sku: "PROD-007",
    name: "Wireless Headphones",
    category: "Electronics",
    totalStock: 8,
    allocated: 5,
    available: 3,
    reorderLevel: 12,
    status: "Low Stock",
    lastUpdated: "2025-04-16",
  },
];

const AdminInventory = () => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [inventory] = useState(inventoryItems);

  // Filter inventory based on selected filters
  const filteredInventory = inventory.filter((item) => {
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  // Calculate inventory stats
  const totalItems = inventory.reduce((acc, item) => acc + item.totalStock, 0);
  const lowStockItems = inventory.filter((item) => item.status === "Low Stock").length;
  const outOfStockItems = inventory.filter((item) => item.status === "Out of Stock").length;

  return (
    <AdminLayout title="Inventory">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter size={16} className="mr-2" /> Advanced Filter
          </Button>
          <Button variant="outline">
            <RefreshCw size={16} className="mr-2" /> Refresh
          </Button>
          <Button variant="outline">
            <Download size={16} className="mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <StatCard
          title="Total Inventory"
          value={`${totalItems} units`}
          icon={<Package className="text-smis-primary" size={18} />}
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
          icon={<TrendingUp className="text-red-500" size={18} />}
          description="Needs immediate attention"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>
            Manage your warehouse inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input placeholder="Search by SKU or name..." />
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
              { key: "totalStock", header: "Total Stock" },
              { key: "allocated", header: "Allocated" },
              { key: "available", header: "Available" },
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
              { key: "lastUpdated", header: "Last Updated" },
            ]}
            searchable
          />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminInventory;
