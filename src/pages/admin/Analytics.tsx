
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import LineChart from "@/components/charts/LineChart";
import StatCard from "@/components/common/StatCard";
import { DollarSign, TrendingUp, ShoppingCart, Calendar } from "lucide-react";

// Mock data
const monthlySalesData = [
  { name: "Jan", sales: 4200, profit: 1260, expenses: 2940 },
  { name: "Feb", sales: 3800, profit: 1140, expenses: 2660 },
  { name: "Mar", sales: 5100, profit: 1530, expenses: 3570 },
  { name: "Apr", sales: 4800, profit: 1440, expenses: 3360 },
  { name: "May", sales: 5800, profit: 1740, expenses: 4060 },
  { name: "Jun", sales: 6200, profit: 1860, expenses: 4340 },
];

const categoryDistribution = [
  { name: "Electronics", value: 42, color: "#0088FE" },
  { name: "Clothing", value: 28, color: "#00C49F" },
  { name: "Food", value: 15, color: "#FFBB28" },
  { name: "Books", value: 10, color: "#FF8042" },
  { name: "Others", value: 5, color: "#8884D8" },
];

const productPerformance = [
  { name: "Smartphone X", sales: 120, growth: 15 },
  { name: "Laptop Pro", sales: 85, growth: 5 },
  { name: "T-shirt Basic", sales: 200, growth: 25 },
  { name: "Coffee Premium", sales: 150, growth: 10 },
  { name: "Novel Bestseller", sales: 70, growth: -5 },
];

const weekdaySales = [
  { name: "Mon", sales: 1200 },
  { name: "Tue", sales: 1300 },
  { name: "Wed", sales: 1400 },
  { name: "Thu", sales: 1800 },
  { name: "Fri", sales: 2400 },
  { name: "Sat", sales: 2600 },
  { name: "Sun", sales: 1900 },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <AdminLayout title="Analytics">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sales Analytics</h2>
        <div className="flex gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Revenue"
          value="$29,900"
          icon={<DollarSign className="text-smis-primary" size={18} />}
          trend={{ value: 12, isPositive: true }}
          description="vs. previous period"
        />
        <StatCard
          title="Profit"
          value="$8,970"
          icon={<TrendingUp className="text-smis-primary" size={18} />}
          trend={{ value: 8, isPositive: true }}
          description="vs. previous period"
        />
        <StatCard
          title="Total Orders"
          value="625"
          icon={<ShoppingCart className="text-smis-primary" size={18} />}
          trend={{ value: 5, isPositive: true }}
          description="vs. previous period"
        />
        <StatCard
          title="Avg. Order Value"
          value="$47.84"
          icon={<Calendar className="text-smis-primary" size={18} />}
          trend={{ value: 2, isPositive: false }}
          description="vs. previous period"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Sales, profit, and expenses over time</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={monthlySalesData}
                xDataKey="name"
                bars={[
                  { dataKey: "sales", fill: "#0088FE", name: "Sales" },
                  { dataKey: "profit", fill: "#00C49F", name: "Profit" },
                  { dataKey: "expenses", fill: "#FF8042", name: "Expenses" },
                ]}
                height={350}
              />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Sales by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={categoryDistribution}
                  height={250}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Best selling products by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={productPerformance}
                  xDataKey="name"
                  bars={[
                    { dataKey: "sales", fill: "#8884d8", name: "Sales" },
                  ]}
                  height={250}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Sales and growth rate by product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-4">Sales by Product</h4>
                  <BarChart
                    data={productPerformance}
                    xDataKey="name"
                    bars={[
                      { dataKey: "sales", fill: "#8884d8", name: "Sales" },
                    ]}
                    height={300}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4">Growth Rate by Product</h4>
                  <BarChart
                    data={productPerformance}
                    xDataKey="name"
                    bars={[
                      { dataKey: "growth", fill: "#82ca9d", name: "Growth %" },
                    ]}
                    height={300}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Distribution of sales across product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center justify-center">
                  <PieChart
                    data={categoryDistribution}
                    height={300}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4">Category Breakdown</h4>
                  <ul className="space-y-4">
                    {categoryDistribution.map((category) => (
                      <li key={category.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: category.color }}
                          />
                          <span>{category.name}</span>
                        </div>
                        <span className="font-medium">{category.value}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Sales Pattern</CardTitle>
              <CardDescription>Sales distribution by day of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={weekdaySales}
                xDataKey="name"
                lines={[
                  { dataKey: "sales", stroke: "#0088FE", name: "Daily Sales" },
                ]}
                height={350}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Analytics;
