
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  // General settings
  const [companyName, setCompanyName] = useState("Smart Inventory Inc.");
  const [email, setEmail] = useState("admin@smartinventory.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [address, setAddress] = useState("123 Inventory St, Warehouse City, 90210");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [dailyReports, setDailyReports] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [monthlyReports, setMonthlyReports] = useState(true);
  
  // System settings
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [lowStockThreshold, setLowStockThreshold] = useState("10");
  const [dataRetention, setDataRetention] = useState("90");
  const [autoApproval, setAutoApproval] = useState(false);
  
  const { toast } = useToast();

  // Save general settings
  const saveGeneralSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated successfully.",
    });
  };

  // Save notification settings
  const saveNotificationSettings = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  // Save system settings
  const saveSystemSettings = () => {
    toast({
      title: "System settings saved",
      description: "System configuration has been updated successfully.",
    });
  };

  return (
    <AdminLayout title="Settings">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">System Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your company information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                
                <div className="pt-4">
                  <Button onClick={saveGeneralSettings} className="bg-smis-primary">
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="stock-alerts" className="font-medium">
                      Low Stock Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when products are running low
                    </p>
                  </div>
                  <Switch
                    id="stock-alerts"
                    checked={stockAlerts}
                    onCheckedChange={setStockAlerts}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Report Schedules</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="daily-reports">Daily Reports</Label>
                    <Switch
                      id="daily-reports"
                      checked={dailyReports}
                      onCheckedChange={setDailyReports}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weekly-reports">Weekly Reports</Label>
                    <Switch
                      id="weekly-reports"
                      checked={weeklyReports}
                      onCheckedChange={setWeeklyReports}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="monthly-reports">Monthly Reports</Label>
                    <Switch
                      id="monthly-reports"
                      checked={monthlyReports}
                      onCheckedChange={setMonthlyReports}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={saveNotificationSettings} className="bg-smis-primary">
                    Save Notification Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>
                Configure system-wide settings and defaults
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="default-currency">Default Currency</Label>
                  <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                    <SelectTrigger id="default-currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="low-stock">Low Stock Threshold</Label>
                  <Input
                    id="low-stock"
                    type="number"
                    min="1"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Products with stock below this threshold will trigger low stock alerts
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention (days)</Label>
                  <Input
                    id="data-retention"
                    type="number"
                    min="1"
                    value={dataRetention}
                    onChange={(e) => setDataRetention(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of days to keep transaction history and logs
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-approval" className="font-medium">
                      Auto-approve Stock Requests
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically approve stock requests under the threshold
                    </p>
                  </div>
                  <Switch
                    id="auto-approval"
                    checked={autoApproval}
                    onCheckedChange={setAutoApproval}
                  />
                </div>
                
                <div className="pt-4">
                  <Button onClick={saveSystemSettings} className="bg-smis-primary">
                    Save System Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border rounded-md p-3 cursor-pointer bg-white">
                      <div className="h-10 bg-white border mb-2 rounded"></div>
                      <div className="text-center text-sm">Light</div>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer">
                      <div className="h-10 bg-slate-900 mb-2 rounded"></div>
                      <div className="text-center text-sm">Dark</div>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer">
                      <div className="h-10 bg-gradient-to-r from-white to-slate-900 mb-2 rounded"></div>
                      <div className="text-center text-sm">System</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <div className="grid grid-cols-6 gap-2">
                    <div className="border rounded-full w-8 h-8 bg-blue-500 cursor-pointer"></div>
                    <div className="border rounded-full w-8 h-8 bg-green-500 cursor-pointer"></div>
                    <div className="border rounded-full w-8 h-8 bg-red-500 cursor-pointer"></div>
                    <div className="border rounded-full w-8 h-8 bg-purple-500 cursor-pointer"></div>
                    <div className="border rounded-full w-8 h-8 bg-yellow-500 cursor-pointer"></div>
                    <div className="border rounded-full w-8 h-8 bg-pink-500 cursor-pointer"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-mode" className="font-medium">
                      Compact Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Use a more compact layout to fit more content
                    </p>
                  </div>
                  <Switch id="compact-mode" />
                </div>
                
                <div className="pt-4">
                  <Button className="bg-smis-primary">
                    Save Appearance Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Settings;
