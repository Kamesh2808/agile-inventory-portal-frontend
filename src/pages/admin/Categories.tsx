
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
import { Plus, Pencil, Trash } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

// Mock data
const initialCategories = [
  { id: 1, name: "Electronics", description: "Electronic devices and accessories", count: 25 },
  { id: 2, name: "Clothing", description: "Apparel and fashion items", count: 18 },
  { id: 3, name: "Food", description: "Edible products and groceries", count: 12 },
  { id: 4, name: "Books", description: "Books, magazines, and publications", count: 15 },
  { id: 5, name: "Home & Kitchen", description: "Household and kitchen items", count: 20 },
  { id: 6, name: "Beauty", description: "Cosmetics and personal care", count: 8 },
];

type Category = (typeof initialCategories)[0];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const { toast } = useToast();

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
    });
  };

  // Open edit dialog with category data
  const handleEditClick = (category: Category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
    });
    setIsEditCategoryOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (category: Category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  // Add new category
  const handleAddCategory = () => {
    const newCategory = {
      id: categories.length + 1,
      name: formData.name,
      description: formData.description,
      count: 0,
    };

    setCategories([...categories, newCategory]);
    resetForm();
    setIsAddCategoryOpen(false);
    
    toast({
      title: "Category added",
      description: `${newCategory.name} has been added successfully.`,
    });
  };

  // Update existing category
  const handleUpdateCategory = () => {
    if (!currentCategory) return;

    const updatedCategories = categories.map((category) => {
      if (category.id === currentCategory.id) {
        return {
          ...category,
          name: formData.name,
          description: formData.description,
        };
      }
      return category;
    });

    setCategories(updatedCategories);
    resetForm();
    setIsEditCategoryOpen(false);
    
    toast({
      title: "Category updated",
      description: `${formData.name} has been updated successfully.`,
    });
  };

  // Delete category
  const handleDeleteCategory = () => {
    if (!currentCategory) return;

    const updatedCategories = categories.filter(
      (category) => category.id !== currentCategory.id
    );

    setCategories(updatedCategories);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Category deleted",
      description: `${currentCategory.name} has been deleted.`,
      variant: "destructive",
    });
  };

  return (
    <AdminLayout title="Categories">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <Button onClick={() => setIsAddCategoryOpen(true)} className="bg-smis-primary">
          <Plus size={16} className="mr-2" /> Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={categories}
            columns={[
              { key: "name", header: "Name" },
              { key: "description", header: "Description" },
              { key: "count", header: "Product Count" },
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

      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Enter the details for the new category.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Electronics"
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory} className="bg-smis-primary">Save Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the details for this category.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-2">
              <Label htmlFor="edit-name">Category Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCategoryOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCategory} className="bg-smis-primary">Update Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentCategory?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteCategory}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Categories;
