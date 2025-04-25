
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
import { Download, Calendar } from "lucide-react";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const salesByCategoryData = [
  { name: "Electronics", value: 45, color: "#0088FE" },
  { name: "Clothing", value: 20, color: "#00C49F" },
  { name: "Food", value: 25, color: "#FFBB28" },
  { name: "Books", value: 10, color: "#FF8042" },
];

const salesByProductData = [
  { name: "Smartphone X", sales: 12500 },
  { name: "Laptop Pro", sales: 9990 },
  { name: "T-shirt Basic", sales: 4998 },
  { name: "Coffee Premium", sales: 3998 },
  { name: "Novel Bestseller", sales: 1049 },
];

const dailySalesData = [
  { date: "Apr 20", sales: 1200 },
  { date: "Apr 21", sales: 1900 },
  { date: "Apr 22", sales: 1500 },
  { date: "Apr 23", sales: 1800 },
  { date: "Apr 24", sales: 2100 },
  { date: "Apr 25", sales: 2500 },
  { date: "Apr 26", sales: 1950 },
];

const monthlySalesData = [
  { month: "Jan", sales: 15000, profit: 4500 },
  { month: "Feb", sales: 18000, profit: 5400 },
  { month: "Mar", sales: 22000, profit: 6600 },
  { month: "Apr", sales: 24000, profit: 7200 },
];

const salesVsTargetData = [
  { month: "Jan", sales: 15000, target: 14000 },
  { month: "Feb", sales: 18000, target: 16000 },
  { month: "Mar", sales: 22000, target: 20000 },
  { month: "Apr", sales: 24000, target: 22000 },
];

const Reports = () => {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <SellerLayout title="Reports">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sales Reports</h2>
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
          <Button variant="outline">
            <Download size={16} className="mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,000</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 12%</span> vs prev. period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,200</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 8%</span> vs prev. period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sold Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">356</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 5%</span> vs prev. period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-500">↓ 2%</span> vs prev. period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Sales</CardTitle>
              <CardDescription>Recent daily revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={dailySalesData}
                xDataKey="date"
                lines={[
                  { dataKey: "sales", stroke: "#0088FE", name: "Sales ($)" },
                ]}
                height={350}
              />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Sales and profit by month</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={monthlySalesData}
                  xDataKey="month"
                  bars={[
                    { dataKey: "sales", fill: "#0088FE", name: "Sales ($)" },
                    { dataKey: "profit", fill: "#00C49F", name: "Profit ($)" },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Sales by category</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={salesByCategoryData}
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best-selling products by revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={salesByProductData}
                xDataKey="name"
                bars={[
                  { dataKey: "sales", fill: "#0088FE", name: "Sales ($)" },
                ]}
                height={400}
              />
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
                    data={salesByCategoryData}
                    height={300}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4">Category Breakdown</h4>
                  <ul className="space-y-4">
                    {salesByCategoryData.map((category) => (
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

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales vs. Target</CardTitle>
              <CardDescription>Comparing actual sales against set targets</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={salesVsTargetData}
                xDataKey="month"
                bars={[
                  { dataKey: "sales", fill: "#0088FE", name: "Actual Sales" },
                  { dataKey: "target", fill: "#8884d8", name: "Target Sales" },
                ]}
                height={350}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Growth Analysis</CardTitle>
              <CardDescription>Monthly sales trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={monthlySalesData}
                xDataKey="month"
                lines={[
                  { dataKey: "sales", stroke: "#0088FE", name: "Sales" },
                ]}
                height={350}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SellerLayout>
  );
};

export default Reports;
