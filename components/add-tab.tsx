"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AddTab() {

  const handleAddProduct = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log("this is the form data", formData);
    const response = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      console.error("Error:", await response.json());
    }
  };

  const handleAddEmployee = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      role: formData.get("role"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
    };

    const response = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error:", await response.json());
    }
  };

  const handleAddCustomer = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      role: formData.get("role"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
    };

    const response = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error:", await response.json());
    }
  };

  return (
    <Tabs defaultValue="inventory" className="w-[400px]">
      <TabsList className="grid w-[400px] grid-cols-3">
        <TabsTrigger value="add-product">Product</TabsTrigger>
        <TabsTrigger value="add-employee">Employee</TabsTrigger>
        <TabsTrigger value="add-customer">Customer</TabsTrigger>
      </TabsList>
      <TabsContent value="add-customer">
        <Card>
          <CardHeader>
          <CardTitle>Add Customer</CardTitle>
            <CardDescription>Add new customer here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <ScrollArea className="h-70 w-full">
                <div className="space-y-1">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" name="role" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input id="phoneNumber" name="phoneNumber" />
                </div>
              </ScrollArea>
              <Button type="submit" className="mt-2">
                Add Customer
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="add-product">
        <Card>
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
            <CardDescription>
              Add a new product to the inventory.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form
              onSubmit={handleAddProduct}
              encType="multipart/form-data"
              className="space-y-4"
            >
              <ScrollArea className="h-70 w-full">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="condition">Condition</Label>
                  <Input id="condition" name="condition" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="marketvalue">Market Value</Label>
                  <Input
                    id="marketvalue"
                    name="marketvalue"
                    type="number"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" type="number" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="stockQuantity">Stock Quantity</Label>
                  <Input
                    id="stockQuantity"
                    name="stockQuantity"
                    type="number"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="locationId">Location ID</Label>
                  <Input
                    id="locationId"
                    name="locationId"
                    type="number"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" name="description" required />
                </div>
                {/* New file input for the product image */}
                <div className="space-y-1">
                  <Label htmlFor="imageUrl">Product Image</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="file"
                    accept="image/*"
                  />
                </div>
              </ScrollArea>
              <Button type="submit" className="mt-2">
                Add Product
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="add-employee">
        <Card>
          <CardHeader>
            <CardTitle>Add Employee</CardTitle>
            <CardDescription>Add new employee here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <ScrollArea className="h-70 w-full">
                <div className="space-y-1">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" name="role" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input id="phoneNumber" name="phoneNumber" />
                </div>
              </ScrollArea>
              <Button type="submit" className="mt-2">
                Add Employee
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
