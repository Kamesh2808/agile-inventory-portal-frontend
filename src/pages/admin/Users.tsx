
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
import { Plus, Pencil, Trash, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/common/DataTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    lastActive: "2025-04-25",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "seller",
    status: "active",
    lastActive: "2025-04-24",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "seller",
    status: "active",
    lastActive: "2025-04-23",
  },
  {
    id: 4,
    name: "Mary Williams",
    email: "mary.williams@example.com",
    role: "seller",
    status: "inactive",
    lastActive: "2025-04-10",
  },
  {
    id: 5,
    name: "James Brown",
    email: "james.brown@example.com",
    role: "admin",
    status: "active",
    lastActive: "2025-04-25",
  },
];

// Mock seller locations
const initialLocations = [
  {
    id: 1,
    name: "Store A",
    address: "123 Main St, City A",
    manager: "Jane Smith",
    status: "active",
  },
  {
    id: 2,
    name: "Store B",
    address: "456 Second Ave, City B",
    manager: "Robert Johnson",
    status: "active",
  },
  {
    id: 3,
    name: "Store C",
    address: "789 Third Blvd, City C",
    manager: "Unassigned",
    status: "inactive",
  },
];

type User = (typeof initialUsers)[0];
type Location = (typeof initialLocations)[0];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [locations, setLocations] = useState(initialLocations);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [isEditLocationOpen, setIsEditLocationOpen] = useState(false);
  const [isDeleteLocationOpen, setIsDeleteLocationOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [locationFormData, setLocationFormData] = useState({
    name: "",
    address: "",
    manager: "",
    status: "active",
  });
  const { toast } = useToast();

  // User Form Handlers
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleUserRoleChange = (value: string) => {
    setUserFormData({
      ...userFormData,
      role: value,
    });
  };

  const resetUserForm = () => {
    setUserFormData({
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    });
  };

  // Location Form Handlers
  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocationFormData({
      ...locationFormData,
      [name]: value,
    });
  };

  const handleLocationStatusChange = (value: string) => {
    setLocationFormData({
      ...locationFormData,
      status: value,
    });
  };

  const handleLocationManagerChange = (value: string) => {
    setLocationFormData({
      ...locationFormData,
      manager: value,
    });
  };

  const resetLocationForm = () => {
    setLocationFormData({
      name: "",
      address: "",
      manager: "",
      status: "active",
    });
  };

  // User CRUD Operations
  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setUserFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
      confirmPassword: "",
    });
    setIsEditUserOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setCurrentUser(user);
    setIsDeleteUserOpen(true);
  };

  const handleAddUser = () => {
    if (userFormData.password !== userFormData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    const newUser = {
      id: users.length + 1,
      name: userFormData.name,
      email: userFormData.email,
      role: userFormData.role,
      status: "active",
      lastActive: new Date().toISOString().split("T")[0],
    };

    setUsers([...users, newUser]);
    resetUserForm();
    setIsAddUserOpen(false);

    toast({
      title: "User added",
      description: `${newUser.name} has been added successfully.`,
    });
  };

  const handleUpdateUser = () => {
    if (!currentUser) return;

    if (
      userFormData.password &&
      userFormData.password !== userFormData.confirmPassword
    ) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          name: userFormData.name,
          email: userFormData.email,
          role: userFormData.role,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    resetUserForm();
    setIsEditUserOpen(false);

    toast({
      title: "User updated",
      description: `${userFormData.name}'s profile has been updated.`,
    });
  };

  const handleConfirmDeleteUser = () => {
    if (!currentUser) return;

    const updatedUsers = users.filter((user) => user.id !== currentUser.id);
    setUsers(updatedUsers);
    setIsDeleteUserOpen(false);

    // Update locations if the deleted user was a manager
    const updatedLocations = locations.map(location => {
      if (location.manager === currentUser.name) {
        return {
          ...location,
          manager: "Unassigned"
        };
      }
      return location;
    });
    setLocations(updatedLocations);

    toast({
      title: "User deleted",
      description: `${currentUser.name}'s account has been deleted.`,
      variant: "destructive",
    });
  };

  // Location CRUD Operations
  const handleEditLocation = (location: Location) => {
    setCurrentLocation(location);
    setLocationFormData({
      name: location.name,
      address: location.address,
      manager: location.manager,
      status: location.status,
    });
    setIsEditLocationOpen(true);
  };

  const handleDeleteLocation = (location: Location) => {
    setCurrentLocation(location);
    setIsDeleteLocationOpen(true);
  };

  const handleAddLocation = () => {
    const newLocation = {
      id: locations.length + 1,
      name: locationFormData.name,
      address: locationFormData.address,
      manager: locationFormData.manager,
      status: locationFormData.status,
    };

    setLocations([...locations, newLocation]);
    resetLocationForm();
    setIsAddLocationOpen(false);

    toast({
      title: "Location added",
      description: `${newLocation.name} has been added successfully.`,
    });
  };

  const handleUpdateLocation = () => {
    if (!currentLocation) return;

    const updatedLocations = locations.map((location) => {
      if (location.id === currentLocation.id) {
        return {
          ...location,
          name: locationFormData.name,
          address: locationFormData.address,
          manager: locationFormData.manager,
          status: locationFormData.status,
        };
      }
      return location;
    });

    setLocations(updatedLocations);
    resetLocationForm();
    setIsEditLocationOpen(false);

    toast({
      title: "Location updated",
      description: `${locationFormData.name} has been updated.`,
    });
  };

  const handleConfirmDeleteLocation = () => {
    if (!currentLocation) return;

    const updatedLocations = locations.filter(
      (location) => location.id !== currentLocation.id
    );
    setLocations(updatedLocations);
    setIsDeleteLocationOpen(false);

    toast({
      title: "Location deleted",
      description: `${currentLocation.name} has been deleted.`,
      variant: "destructive",
    });
  };

  // Filter functions
  const getSellerUsers = () => {
    return users.filter(user => user.role === "seller");
  };

  return (
    <AdminLayout title="Users">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="locations">Seller Locations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">System Users</h3>
            <Button onClick={() => setIsAddUserOpen(true)} className="bg-smis-primary">
              <Plus size={16} className="mr-2" /> Add User
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <DataTable
                data={users}
                columns={[
                  { key: "name", header: "Name" },
                  { key: "email", header: "Email" },
                  {
                    key: "role",
                    header: "Role",
                    render: (item) => (
                      <Badge
                        variant={item.role === "admin" ? "default" : "outline"}
                        className={
                          item.role === "admin"
                            ? "bg-smis-primary"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        }
                      >
                        {item.role === "admin" ? "Admin" : "Seller"}
                      </Badge>
                    ),
                  },
                  {
                    key: "status",
                    header: "Status",
                    render: (item) => (
                      <Badge
                        variant="outline"
                        className={
                          item.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {item.status}
                      </Badge>
                    ),
                  },
                  { key: "lastActive", header: "Last Active" },
                  {
                    key: "actions",
                    header: "Actions",
                    render: (item) => (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditUser(item)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(item)}
                          disabled={item.role === "admin" && users.filter(u => u.role === "admin").length <= 1}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    ),
                  },
                ]}
                searchable
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="locations">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Seller Locations</h3>
            <Button onClick={() => setIsAddLocationOpen(true)} className="bg-smis-primary">
              <Plus size={16} className="mr-2" /> Add Location
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <DataTable
                data={locations}
                columns={[
                  { key: "name", header: "Location Name" },
                  { key: "address", header: "Address" },
                  { key: "manager", header: "Manager" },
                  {
                    key: "status",
                    header: "Status",
                    render: (item) => (
                      <Badge
                        variant="outline"
                        className={
                          item.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {item.status}
                      </Badge>
                    ),
                  },
                  {
                    key: "actions",
                    header: "Actions",
                    render: (item) => (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditLocation(item)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteLocation(item)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    ),
                  },
                ]}
                searchable
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account to access the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={userFormData.name}
                onChange={handleUserInputChange}
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userFormData.email}
                onChange={handleUserInputChange}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={userFormData.role} onValueChange={handleUserRoleChange}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={userFormData.password}
                onChange={handleUserInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={userFormData.confirmPassword}
                onChange={handleUserInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser} className="bg-smis-primary">
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={userFormData.name}
                onChange={handleUserInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={userFormData.email}
                onChange={handleUserInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={userFormData.role}
                onValueChange={handleUserRoleChange}
                disabled={currentUser?.role === "admin" && users.filter(u => u.role === "admin").length <= 1}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                </SelectContent>
              </Select>
              {currentUser?.role === "admin" && users.filter(u => u.role === "admin").length <= 1 && (
                <p className="text-xs text-amber-600">Cannot change role (last admin)</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-password">New Password (leave blank to keep current)</Label>
              <Input
                id="edit-password"
                name="password"
                type="password"
                value={userFormData.password}
                onChange={handleUserInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-confirmPassword">Confirm New Password</Label>
              <Input
                id="edit-confirmPassword"
                name="confirmPassword"
                type="password"
                value={userFormData.confirmPassword}
                onChange={handleUserInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser} className="bg-smis-primary">
              Update User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <p>
                <strong>User:</strong> {currentUser.name}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p>
                <strong>Role:</strong> {currentUser.role}
              </p>
              {currentUser.role === "admin" && users.filter(u => u.role === "admin").length <= 1 && (
                <p className="text-sm text-red-600 mt-2">
                  Warning: Cannot delete the last admin user.
                </p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteUserOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmDeleteUser}
              disabled={currentUser?.role === "admin" && users.filter(u => u.role === "admin").length <= 1}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Location Dialog */}
      <Dialog open={isAddLocationOpen} onOpenChange={setIsAddLocationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
            <DialogDescription>
              Create a new seller location.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="location-name">Location Name</Label>
              <Input
                id="location-name"
                name="name"
                value={locationFormData.name}
                onChange={handleLocationInputChange}
                placeholder="Store Name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location-address">Address</Label>
              <Input
                id="location-address"
                name="address"
                value={locationFormData.address}
                onChange={handleLocationInputChange}
                placeholder="123 Main St, City, State"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location-manager">Manager</Label>
              <Select 
                value={locationFormData.manager} 
                onValueChange={handleLocationManagerChange}
              >
                <SelectTrigger id="location-manager">
                  <SelectValue placeholder="Select a manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                  {getSellerUsers().map(user => (
                    <SelectItem key={user.id} value={user.name}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location-status">Status</Label>
              <Select 
                value={locationFormData.status} 
                onValueChange={handleLocationStatusChange}
              >
                <SelectTrigger id="location-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddLocationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLocation} className="bg-smis-primary">
              Add Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Location Dialog */}
      <Dialog open={isEditLocationOpen} onOpenChange={setIsEditLocationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
              Update location information and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-location-name">Location Name</Label>
              <Input
                id="edit-location-name"
                name="name"
                value={locationFormData.name}
                onChange={handleLocationInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-location-address">Address</Label>
              <Input
                id="edit-location-address"
                name="address"
                value={locationFormData.address}
                onChange={handleLocationInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-location-manager">Manager</Label>
              <Select 
                value={locationFormData.manager} 
                onValueChange={handleLocationManagerChange}
              >
                <SelectTrigger id="edit-location-manager">
                  <SelectValue placeholder="Select a manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                  {getSellerUsers().map(user => (
                    <SelectItem key={user.id} value={user.name}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-location-status">Status</Label>
              <Select 
                value={locationFormData.status} 
                onValueChange={handleLocationStatusChange}
              >
                <SelectTrigger id="edit-location-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditLocationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateLocation} className="bg-smis-primary">
              Update Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Location Confirmation Dialog */}
      <Dialog open={isDeleteLocationOpen} onOpenChange={setIsDeleteLocationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Location</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this location? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentLocation && (
            <div className="py-4">
              <p>
                <strong>Location:</strong> {currentLocation.name}
              </p>
              <p>
                <strong>Address:</strong> {currentLocation.address}
              </p>
              <p>
                <strong>Manager:</strong> {currentLocation.manager}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteLocationOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDeleteLocation}>
              Delete Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Users;
