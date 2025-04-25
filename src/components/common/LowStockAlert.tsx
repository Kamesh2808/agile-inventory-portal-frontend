
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type LowStockAlertProps = {
  isOpen: boolean;
  onClose: () => void;
  lowStockItems: {
    id: number;
    name: string;
    currentStock: number;
    minStock: number;
  }[];
  userRole: string;
};

const LowStockAlert = ({
  isOpen,
  onClose,
  lowStockItems,
  userRole,
}: LowStockAlertProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Low Stock Alert</AlertDialogTitle>
          <AlertDialogDescription>
            The following items are running low on stock:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="max-h-64 overflow-y-auto">
          <ul className="space-y-2">
            {lowStockItems.map((item) => (
              <li
                key={item.id}
                className="p-2 border border-amber-200 bg-amber-50 rounded-md"
              >
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">
                  Current: {item.currentStock} (Minimum: {item.minStock})
                </div>
              </li>
            ))}
          </ul>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Dismiss</AlertDialogCancel>
          {userRole === "seller" ? (
            <Button asChild className="bg-smis-primary">
              <Link to="/seller/request-stock">Request Stock</Link>
            </Button>
          ) : (
            <Button asChild className="bg-smis-primary">
              <Link to="/admin/stock-transfer">Transfer Stock</Link>
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LowStockAlert;
