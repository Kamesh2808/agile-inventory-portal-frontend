
import { useState, useEffect } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import StatCard from "@/components/common/StatCard";
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  AlertTriangle,
  Users
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import LineChart from "@/components/charts/LineChart";
import DataTable from "@/components/common/DataTable";
import LowStockAlert from "@/components/common/LowStockAlert";
import StatusBadge from "@/components/common/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const salesData = [
  { name: "Jan", sales: 4000, profit: 2400, target: 3000 },
  { name: "Feb", sales: 3000, profit: 1398, target: 3000 },
  { name: "Mar", sales: 2000, profit: 9800, target: 3000 },
  { name: "Apr", sales: 2780, profit: 3908, target: 3000 },
  { name: "May", sales: 1890, profit: 4800, target: 3000 },
  { name: "Jun", sales: 2390, profit: 3800, target: 3000 },
];

const categoryData = [
  { name: "Electronics", value: 400, color: "#0088FE" },
  { name: "Clothing", value: 300, color: "#00C49F" },
  { name: "Food", value: 300, color: "#FFBB28" },
  { name: "Books", value: 200, color: "#FF8042" },
];

const recentStockRequests = [
  {
    id: 1,
    seller: "ABC Store",
    items: 5,
    total: 2500,
    status: "pending" as const,
    date: "2025-04-23",
  },
  {
    id: 2,
    seller: "XYZ Mart",
    items: 3,
    total: 1200,
    status: "approved" as const,
    date: "2025-04-22",
  },
  {
    id: 3,
    seller: "123 Shop",
    items: 7,
    total: 3200,
    status: "completed" as const,
    date: "2025-04-21",
  },
  {
    id: 4,
    seller: "Best Buy",
    items: 2,
    total: 800,
    status: "rejected" as const,
    date: "2025-04-20",
  },
];

const lowStockItems = [
  {
    id: 1,
    name: "Smartphone X",
    currentStock: 5,
    minStock: 10,
  },
  {
    id: 2,
    name: "Laptop Pro",
    currentStock: 3,
    minStock: 8,
  },
  {
    id: 3,
    name: "Wireless Headphones",
    currentStock: 2,
    minStock: 15,
  },
];

const topSellingProducts = [
  {
    id: 1,
    name: "Smartphone X",
    category: "Electronics",
    sold: 124,
    revenue: 124000,
  },
  {
    id: 2,
    name: "Laptop Pro",
    category: "Electronics",
    sold: 98,
    revenue: 196000,
  },
  {
    id: 3,
    name: "T-shirt Basic",
    category: "Clothing",
    sold: 85,
    revenue: 2125,
  },
  {
    id: 4,
    name: "Coffee Premium",
    category: "Food",
    sold: 76,
    revenue: 1520,
  },
];

const AdminDashboard = () => {
  const [showLowStockAlert, setShowLowStockAlert] = useState(false);

  useEffect(() => {
    // Show low stock alert after a short delay to simulate system check
    const timer = setTimeout(() => {
      setShowLowStockAlert(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <StatCard
          title="Total Products"
          value="1,248"
          icon={<Package className="text-smis-primary" size={18} />}
          trend={{ value: 12, isPositive: true }}
          description="Since last month"
        />
        <StatCard
          title="Total Sales"
          value="$89,732"
          icon={<ShoppingCart className="text-smis-primary" size={18} />}
          trend={{ value: 8, isPositive: true }}
          description="Since last month"
        />
        <StatCard
          title="Revenue"
          value="$42,124"
          icon={<DollarSign className="text-smis-primary" size={18} />}
          trend={{ value: 5, isPositive: true }}
          description="Since last month"
        />
        <StatCard
          title="Low Stock Items"
          value="8"
          icon={<AlertTriangle className="text-amber-500" size={18} />}
          description="Items below threshold"
        />
        <StatCard
          title="Active Sellers"
          value="24"
          icon={<Users className="text-smis-primary" size={18} />}
          trend={{ value: 2, isPositive: true }}
          description="Since last month"
        />
        <StatCard
          title="Growth"
          value="18%"
          icon={<TrendingUp className="text-smis-primary" size={18} />}
          description="Year over year"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales and profit</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={salesData}
              xDataKey="name"
              bars={[
                { dataKey: "sales", fill: "#0077B6", name: "Sales" },
                { dataKey: "profit", fill: "#00B4D8", name: "Profit" },
              ]}
              height={300}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={categoryData} height={300} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Top Products */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Stock Requests</CardTitle>
            <CardDescription>Latest requests from sellers</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={recentStockRequests}
              columns={[
                { key: "seller", header: "Seller" },
                { key: "items", header: "Items" },
                { key: "total", header: "Total", render: (item) => `$${item.total}` },
                { key: "status", header: "Status", render: (item) => <StatusBadge status={item.status} /> },
                { key: "date", header: "Date" },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing products</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={topSellingProducts}
              columns={[
                { key: "name", header: "Product" },
                { key: "category", header: "Category" },
                { key: "sold", header: "Units Sold" },
                { key: "revenue", header: "Revenue", render: (item) => `$${item.revenue}` },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      {/* Sales Forecast */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sales Forecast</CardTitle>
          <CardDescription>Predicted sales for the next 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="forecast">
            <TabsList>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
              <TabsTrigger value="confidence">Confidence</TabsTrigger>
            </TabsList>
            <TabsContent value="forecast" className="pt-4">
              <LineChart
                data={[
                  { month: "May", actual: 0, predicted: 5200, lower: 4800, upper: 5600 },
                  { month: "Jun", actual: 0, predicted: 5900, lower: 5300, upper: 6500 },
                  { month: "Jul", actual: 0, predicted: 6300, lower: 5600, upper: 7000 },
                  { month: "Aug", actual: 0, predicted: 7100, lower: 6200, upper: 8000 },
                  { month: "Sep", actual: 0, predicted: 7800, lower: 6700, upper: 8900 },
                  { month: "Oct", actual: 0, predicted: 8500, lower: 7200, upper: 9800 },
                ]}
                xDataKey="month"
                lines={[
                  { dataKey: "predicted", stroke: "#0077B6", name: "Predicted" },
                  { dataKey: "lower", stroke: "#CAF0F8", name: "Lower Bound" },
                  { dataKey: "upper", stroke: "#90E0EF", name: "Upper Bound" },
                ]}
                height={300}
              />
            </TabsContent>
            <TabsContent value="confidence" className="pt-4">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="stat-card">
                  <h3 className="text-lg font-medium">Overall Confidence</h3>
                  <div className="mt-2 text-3xl font-bold text-smis-primary">84%</div>
                  <p className="text-sm text-muted-foreground mt-1">Based on historical data</p>
                </div>
                <div className="stat-card">
                  <h3 className="text-lg font-medium">Data Points</h3>
                  <div className="mt-2 text-3xl font-bold">1,248</div>
                  <p className="text-sm text-muted-foreground mt-1">From last 24 months</p>
                </div>
                <div className="stat-card">
                  <h3 className="text-lg font-medium">Model Type</h3>
                  <div className="mt-2 text-xl font-bold">ARIMA + Seasonal</div>
                  <p className="text-sm text-muted-foreground mt-1">Last updated: Yesterday</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      <LowStockAlert
        isOpen={showLowStockAlert}
        onClose={() => setShowLowStockAlert(false)}
        lowStockItems={lowStockItems}
        userRole="admin"
      />
    </AdminLayout>
  );
};

export default AdminDashboard;
