
import { Badge } from "@/components/ui/badge";

export type Status = "pending" | "approved" | "rejected" | "completed" | "in-progress" | "cancelled" | "low" | "medium" | "high" | "critical";

type StatusBadgeProps = {
  status: Status;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusProps = () => {
    switch (status) {
      case "pending":
        return {
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
          label: "Pending",
        };
      case "approved":
        return {
          className: "bg-green-100 text-green-800 hover:bg-green-100",
          label: "Approved",
        };
      case "rejected":
        return {
          className: "bg-red-100 text-red-800 hover:bg-red-100",
          label: "Rejected",
        };
      case "completed":
        return {
          className: "bg-green-100 text-green-800 hover:bg-green-100",
          label: "Completed",
        };
      case "in-progress":
        return {
          className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
          label: "In Progress",
        };
      case "cancelled":
        return {
          className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
          label: "Cancelled",
        };
      case "low":
        return {
          className: "bg-green-100 text-green-800 hover:bg-green-100",
          label: "Low Priority",
        };
      case "medium":
        return {
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
          label: "Medium Priority",
        };
      case "high":
        return {
          className: "bg-orange-100 text-orange-800 hover:bg-orange-100",
          label: "High Priority",
        };
      case "critical":
        return {
          className: "bg-red-100 text-red-800 hover:bg-red-100",
          label: "Critical",
        };
      default:
        return {
          className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
          label: status,
        };
    }
  };

  const { className, label } = getStatusProps();

  return <Badge variant="outline" className={className}>{label}</Badge>;
};

export default StatusBadge;
