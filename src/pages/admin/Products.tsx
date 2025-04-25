
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import DataTable from "@/components/common/DataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// Mock data
const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Food" },
  { id: 4, name: "Books" },
];

const initialProducts = [
  {
    id: 1,
    sku: "PROD-001",
    name: "Smartphone X",
    category: "Electronics",
    price: 999.99,
    quantity: 45,
    status: "Active",
  },
  {
    id: 2,
    sku: "PROD-002",
    name: "Laptop Pro",
    category: "Electronics",
    price: 1999.99,
    quantity: 28,
    status: "Active",
  },
  {
    id: 3,
    sku: "PROD-003",
    name: "T-shirt Basic",
    category: "Clothing",
    price: 24.99,
    quantity: 120,
    status: "Active",
  },
  {
    id: 4,
    sku: "PROD-004",
    name: "Coffee Premium",
    category: "Food",
    price: 19.99,
    quantity: 60,
    status: "Active",
  },
  {
    id: 5,
    sku: "PROD-005",
    name: "Novel Bestseller",
    category: "Books",
    price: 14.99,
    quantity: 85,
    status: "Active",
  },
  {
    id: 6,
    sku: "PROD-006",
    name: "Tablet Mini",
    category: "Electronics",
    price: 499.99,
    quantity: 0,
    status: "Out of Stock",
  },
  {
    id: 7,
    sku: "PROD-007",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 149.99,
    quantity: 8,
    status: "Low Stock",
  },
];

type Product = (typeof initialProducts)[0];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isViewProductOpen, setIsViewProductOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      sku: "",
      name: "",
      category: "",
      price: "",
      quantity: "",
      description: "",
    });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // Open edit dialog with product data
  const handleEditClick = (product: Product) => {
    setCurrentProduct(product);
    setFormData({
      sku: product.sku,
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      description: "",  // Assuming description is not in the mock data
    });
    setIsEditProductOpen(true);
  };

  // Open view dialog with product data
  const handleViewClick = (product: Product) => {
    setCurrentProduct(product);
    setIsViewProductOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Add new product
  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      sku: formData.sku,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      status: parseInt(formData.quantity) > 0 ? "Active" : "Out of Stock",
    };

    setProducts([...products, newProduct]);
    resetForm();
    setIsAddProductOpen(false);
    
    toast({
      title: "Product added",
      description: `${newProduct.name} has been added successfully.`,
    });
  };

  // Update existing product
  const handleUpdateProduct = () => {
    if (!currentProduct) return;

    const updatedProducts = products.map((product) => {
      if (product.id === currentProduct.id) {
        return {
          ...product,
          sku: formData.sku,
          name: formData.name,
          category: formData.category,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
          status: parseInt(formData.quantity) > 0 ? "Active" : "Out of Stock",
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    resetForm();
    setIsEditProductOpen(false);
    
    toast({
      title: "Product updated",
      description: `${formData.name} has been updated successfully.`,
    });
  };

  // Delete product
  const handleDeleteProduct = () => {
    if (!currentProduct) return;

    const updatedProducts = products.filter(
      (product) => product.id !== currentProduct.id
    );

    setProducts(updatedProducts);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Product deleted",
      description: `${currentProduct.name} has been deleted.`,
      variant: "destructive",
    });
  };

  return (
    <AdminLayout title="Products">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Button onClick={() => setIsAddProductOpen(true)} className="bg-smis-primary">
          <Plus size={16} className="mr-2" /> Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your product inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={products}
            columns={[
              { key: "sku", header: "SKU" },
              { key: "name", header: "Name" },
              { key: "category", header: "Category" },
              {
                key: "price",
                header: "Price",
                render: (item) => `$${item.price.toFixed(2)}`,
              },
              { key: "quantity", header: "Quantity" },
              {
                key: "status",
                header: "Status",
                render: (item) => {
                  let badgeClass = "";
                  if (item.status === "Active") badgeClass = "bg-green-100 text-green-800 hover:bg-green-100";
                  else if (item.status === "Out of Stock") badgeClass = "bg-red-100 text-red-800 hover:bg-red-100";
                  else if (item.status === "Low Stock") badgeClass = "bg-amber-100 text-amber-800 hover:bg-amber-100";
                  
                  return <Badge variant="outline" className={badgeClass}>{item.status}</Badge>;
                },
              },
              {
                key: "actions",
                header: "Actions",
                render: (item) => (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewClick(item);
                      }}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item);
                      }}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(item);
                      }}
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

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Enter the details for the new product.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="e.g. PROD-001"
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Smartphone X"
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid items-center gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g. 999.99"
                />
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="e.g. 50"
                />
              </div>
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows={3}
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct} className="bg-smis-primary">Save Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details for this product.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-2">
              <Label htmlFor="edit-sku">SKU</Label>
              <Input
                id="edit-sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="edit-name">Product Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger id="edit-category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid items-center gap-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="edit-quantity">Quantity</Label>
                <Input
                  id="edit-quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="edit-image">Product Image</Label>
              <Input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProduct} className="bg-smis-primary">Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Product Dialog */}
      <Dialog open={isViewProductOpen} onOpenChange={setIsViewProductOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4">
                <div className="h-32 w-32 bg-gray-200 rounded-md flex items-center justify-center">
                  <Package size={48} className="text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">SKU:</div>
                <div className="col-span-2">{currentProduct.sku}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Name:</div>
                <div className="col-span-2">{currentProduct.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Category:</div>
                <div className="col-span-2">{currentProduct.category}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Price:</div>
                <div className="col-span-2">${currentProduct.price.toFixed(2)}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Quantity:</div>
                <div className="col-span-2">{currentProduct.quantity}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Status:</div>
                <div className="col-span-2">
                  <Badge
                    variant="outline"
                    className={
                      currentProduct.status === "Active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : currentProduct.status === "Out of Stock"
                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                    }
                  >
                    {currentProduct.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewProductOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentProduct?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteProduct}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Products;
