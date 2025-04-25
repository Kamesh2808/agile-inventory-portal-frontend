
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthContext } from "../../App";
import { 
  Home, 
  Database, 
  FileCheck, 
  ShoppingCart, 
  Clock, 
  BarChart, 
  User, 
  Bell, 
  Search,
  Menu,
  LogOut
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type SellerLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const SellerLayout = ({ children, title }: SellerLayoutProps) => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const [notificationCount] = useState(3); // Simulated notification count
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/seller", icon: Home },
    { name: "Inventory", href: "/seller/inventory", icon: Database },
    { name: "Request Stock", href: "/seller/request-stock", icon: FileCheck },
    { name: "Sales", href: "/seller/sales", icon: ShoppingCart },
    { name: "Sales History", href: "/seller/sales-history", icon: Clock },
    { name: "Reports", href: "/seller/reports", icon: BarChart },
    { name: "Profile", href: "/seller/profile", icon: User },
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
            <h1 className="text-xl font-bold">SMIS Seller</h1>
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
              <h1 className="text-xl font-bold">SMIS Seller</h1>
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
            <SheetTrigger asChild className="md:hidden mr-2">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={20} />
              </Button>
            </SheetTrigger>
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
            <div className="relative rounded-full h-8 w-8 bg-smis-secondary flex items-center justify-center text-white">
              S
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

export default SellerLayout;
