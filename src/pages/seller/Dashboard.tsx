
import { useState, useEffect } from "react";
import SellerLayout from "@/components/layouts/SellerLayout";
import StatCard from "@/components/common/StatCard";
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  AlertTriangle,
  ArrowDownUp,
  Calendar
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import DataTable from "@/components/common/DataTable";
import LowStockAlert from "@/components/common/LowStockAlert";
import StatusBadge from "@/components/common/StatusBadge";

// Mock data
const salesData = [
  { name: "Jan", sales: 2100, target: 2000 },
  { name: "Feb", sales: 1800, target: 2000 },
  { name: "Mar", sales: 2400, target: 2000 },
  { name: "Apr", sales: 1900, target: 2000 },
  { name: "May", sales: 2300, target: 2000 },
  { name: "Jun", sales: 2800, target: 2000 },
];

const recentSales = [
  {
    id: 1,
    product: "Smartphone X",
    quantity: 2,
    amount: 1999.98,
    date: "2025-04-25",
  },
  {
    id: 2,
    product: "Laptop Pro",
    quantity: 1,
    amount: 1999.99,
    date: "2025-04-25",
  },
  {
    id: 3,
    product: "T-shirt Basic",
    quantity: 5,
    amount: 124.95,
    date: "2025-04-24",
  },
  {
    id: 4,
    product: "Coffee Premium",
    quantity: 3,
    amount: 59.97,
    date: "2025-04-24",
  },
];

const stockRequests = [
  {
    id: 1,
    product: "Smartphone X",
    quantity: 10,
    status: "approved" as const,
    requestDate: "2025-04-22",
  },
  {
    id: 2,
    product: "Laptop Pro",
    quantity: 5,
    status: "pending" as const,
    requestDate: "2025-04-24",
  },
  {
    id: 3,
    product: "Wireless Headphones",
    quantity: 15,
    status: "pending" as const,
    requestDate: "2025-04-25",
  },
];

const lowStockItems = [
  {
    id: 1,
    name: "Smartphone X",
    currentStock: 2,
    minStock: 5,
  },
  {
    id: 2,
    name: "Wireless Headphones",
    currentStock: 1,
    minStock: 8,
  },
];

const SellerDashboard = () => {
  const [showLowStockAlert, setShowLowStockAlert] = useState(false);

  useEffect(() => {
    // Show low stock alert after a short delay to simulate system check
    const timer = setTimeout(() => {
      setShowLowStockAlert(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SellerLayout title="Dashboard">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <StatCard
          title="Current Inventory"
          value="348 items"
          icon={<Package className="text-smis-secondary" size={18} />}
          trend={{ value: 5, isPositive: true }}
          description="Since last week"
        />
        <StatCard
          title="Sales Today"
          value="$4,184.92"
          icon={<ShoppingCart className="text-smis-secondary" size={18} />}
          trend={{ value: 12, isPositive: true }}
          description="Compared to yesterday"
        />
        <StatCard
          title="Monthly Revenue"
          value="$28,427"
          icon={<DollarSign className="text-smis-secondary" size={18} />}
          trend={{ value: 8, isPositive: true }}
          description="Compared to last month"
        />
        <StatCard
          title="Low Stock Items"
          value="2"
          icon={<AlertTriangle className="text-amber-500" size={18} />}
          description="Items below threshold"
        />
        <StatCard
          title="Pending Stock Requests"
          value="2"
          icon={<ArrowDownUp className="text-smis-secondary" size={18} />}
          description="Awaiting approval"
        />
        <StatCard
          title="Sales Target"
          value="82%"
          icon={<Calendar className="text-smis-secondary" size={18} />}
          description="Monthly progress"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button asChild className="w-full bg-smis-secondary">
                <Link to="/seller/sales">Record New Sale</Link>
              </Button>
              <Button asChild className="w-full bg-smis-secondary/80">
                <Link to="/seller/request-stock">Request Stock</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/seller/inventory">View Inventory</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Monthly sales against target</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={salesData}
              xDataKey="name"
              bars={[
                { dataKey: "sales", fill: "#00B4D8", name: "Sales" },
                { dataKey: "target", fill: "#90E0EF", name: "Target" },
              ]}
              height={240}
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Last 4 sales recorded</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={recentSales}
              columns={[
                { key: "product", header: "Product" },
                { key: "quantity", header: "Qty" },
                { 
                  key: "amount", 
                  header: "Amount",
                  render: (item) => `$${item.amount.toFixed(2)}`
                },
                { key: "date", header: "Date" },
              ]}
            />
            <div className="mt-4 text-right">
              <Button variant="link" asChild className="text-smis-secondary">
                <Link to="/seller/sales-history">View All Sales</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stock Requests</CardTitle>
            <CardDescription>Your recent stock requests</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={stockRequests}
              columns={[
                { key: "product", header: "Product" },
                { key: "quantity", header: "Qty" },
                { 
                  key: "status", 
                  header: "Status",
                  render: (item) => <StatusBadge status={item.status} />
                },
                { key: "requestDate", header: "Date" },
              ]}
            />
            <div className="mt-4 text-right">
              <Button variant="link" asChild className="text-smis-secondary">
                <Link to="/seller/request-stock">View All Requests</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Forecast */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sales Forecast</CardTitle>
          <CardDescription>Predicted sales for the next 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            data={[
              { day: "1", actual: 1200, forecast: 1200 },
              { day: "5", actual: 1350, forecast: 1350 },
              { day: "10", actual: 1100, forecast: 1100 },
              { day: "15", actual: 1400, forecast: 1400 },
              { day: "20", actual: 0, forecast: 1550 },
              { day: "25", actual: 0, forecast: 1650 },
              { day: "30", actual: 0, forecast: 1750 },
            ]}
            xDataKey="day"
            lines={[
              { dataKey: "actual", stroke: "#0077B6", name: "Actual" },
              { dataKey: "forecast", stroke: "#00B4D8", name: "Forecast" },
            ]}
            height={300}
          />
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      <LowStockAlert
        isOpen={showLowStockAlert}
        onClose={() => setShowLowStockAlert(false)}
        lowStockItems={lowStockItems}
        userRole="seller"
      />
    </SellerLayout>
  );
};

export default SellerDashboard;
