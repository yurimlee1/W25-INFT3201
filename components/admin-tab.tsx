// components/admin-tab.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from 'react';

interface Product {
  productid: number;
  name: string;
  category: string;
  condition: string;
  marketvalue: number;
  price: number;
  stockquantity: number;
  locationid: number;
}

interface Repair {
  repairid: number;
  customername: string;
  productname: string;
  issuedescription: string;
  repairstatus: string;
}

export function AdminTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchRepairs();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepairs = async () => {
    try {
      const response = await fetch('/api/repairs');
      console.log("repaird data", response);
      if (!response.ok) throw new Error('Failed to fetch repairs');
      const data = await response.json();
      console.log("repaird data", data);
      setRepairs(data);
    } catch (error) {
      console.error('Error fetching repairs:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(products.filter(product => product.productid !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      category: formData.get("category"),
      condition: formData.get("condition"),
      marketValue: Number(formData.get("marketValue")),
      price: Number(formData.get("price")),
      stockQuantity: Number(formData.get("stockQuantity")),
      locationId: Number(formData.get("locationId")),
    };

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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

  return (
    <Tabs defaultValue="inventory" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="repair">Repair</TabsTrigger>
        <TabsTrigger value="product">Add Products</TabsTrigger>
        <TabsTrigger value="employees">Employees</TabsTrigger>
      </TabsList>
      <TabsContent value="inventory">
        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>
              View and manage your product inventory here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {loading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              products.map(product => (
                <div key={product.productid} className="space-y-1 border p-2 rounded">
                  <p><strong>Name:</strong> {product.name}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Condition:</strong> {product.condition}</p>
                  <p><strong>Price:</strong> ${product.price}</p>
                  <p><strong>Stock:</strong> {product.stockquantity}</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product.productid)}
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={fetchProducts}>Refresh</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="repair">
        <Card>
          <CardHeader>
            <CardTitle>Repair Requests</CardTitle>
            <CardDescription>
              View all repair requests here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {repairs.length === 0 ? (
              <p>No repair requests available.</p>
            ) : (
              repairs.map(repair => (
                <div key={repair.repairid} className="space-y-1 border p-2 rounded">
                  <p><strong>Repair ID:</strong> {repair.repairid}</p>
                  <p><strong>Customer:</strong> {repair.customername}</p>
                  <p><strong>Product:</strong> {repair.productname}</p>
                  <p><strong>Issue:</strong> {repair.issuedescription}</p>
                  <p><strong>Status:</strong> {repair.repairstatus}</p>
                </div>
              ))
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={fetchRepairs}>Refresh</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="product">
        <Card>
          <CardHeader>
            <CardTitle>Add Products</CardTitle>
            <CardDescription>
              Add a new product to the inventory.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleAddProduct}>
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
                <Input id="marketvalue" name="marketvalue" type="number" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input id="stockQuantity" name="stockQuantity" type="number" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="locationId">Location ID</Label>
                <Input id="locationId" name="locationId" type="number" required />
              </div>
              <Button type="submit" className="mt-2">Add Product</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="employees">
        <Card>
          <CardHeader>
            <CardTitle>Add Employees</CardTitle>
            <CardDescription>
              Add new employees here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleAddEmployee}>
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
              <Button type="submit" className="mt-2">Add Employee</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}