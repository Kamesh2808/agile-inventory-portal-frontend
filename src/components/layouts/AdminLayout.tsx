
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthContext } from "../../App";
import { 
  Home, 
  Package, 
  Grid3X3, 
  Database, 
  FileCheck, 
  Send, 
  BarChart, 
  Settings, 
  Users, 
  Bell, 
  Search,
  Menu,
  LogOut
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type AdminLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const [notificationCount] = useState(5); // Simulated notification count
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: Grid3X3 },
    { name: "Inventory", href: "/admin/inventory", icon: Database },
    { name: "Stock Requests", href: "/admin/stock-requests", icon: FileCheck },
    { name: "Stock Transfer", href: "/admin/stock-transfer", icon: Send },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <nav className="hidden md:block w-64 bg-sidebar text-sidebar-foreground">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
            <h1 className="text-xl font-bold">SMIS Admin</h1>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <item.icon size={18} className="mr-3" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="p-4 border-t border-sidebar-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="bg-sidebar text-sidebar-foreground p-0 w-64">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
              <h1 className="text-xl font-bold">SMIS Admin</h1>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1 px-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-accent/50"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon size={18} className="mr-3" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="p-4 border-t border-sidebar-border">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={20} />
            </Button>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-smis-primary">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </div>
            <div className="relative rounded-full h-8 w-8 bg-smis-primary flex items-center justify-center text-white">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
