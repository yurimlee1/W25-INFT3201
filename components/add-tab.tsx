"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { Switch } from "./ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from "sonner";


interface Employee {
  employeeid: number;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  phonenumber: number;
}

interface Product {
  productid: number;
  name: string;
  category: string;
  condition: string;
  marketvalue: number;
  price: number;
  stockquantity: number;
  locationid: number;
  description: string;
  imageUrl: string;
}

interface Customer {
  customerid: number;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: number;
}

interface Location {
  locationid: number;
  name: string;
  address: string;
}


export function AddTab() {
  const [products, setProducts] = useState<Product[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
      fetchLocations();
    }, []);


    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/locations");
        if (!response.ok) throw new Error("Failed to fetch locations");
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        toast.error("Failed to fetch locations");
      }
    };

  const handleAddProduct = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to add product");
      toast.success("Product added successfully");
      event.target.reset();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
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
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to add employee");
      toast.success("Employee added successfully");
      event.target.reset();
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Failed to add employee");
    }
  };

  const handleAddCustomer = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
    };
    try{
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.error("Error:", await response.json());
      }
      toast.success("Customer Added Successfully");

    }catch (error) {
      console.error("Error adding customer:", error);
      toast.error("Failed to add customer");
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
          <form onSubmit={handleAddProduct} encType="multipart/form-data" className="space-y-4">
                <ScrollArea className="h-[500px] w-full">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Game">Game</SelectItem>
                        <SelectItem value="Console">Console</SelectItem>
                        <SelectItem value="Accessory">Accessory</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Label htmlFor="locationId">Location</Label>
                    <Select name="locationId" required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem
                            key={location.locationid}
                            value={location.locationid.toString()}
                          >
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="condition">Condition</Label>
                    <Select name="condition" required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Used">Used</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" name="description" required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="imageUrl">Product Image</Label>
                    <Input id="imageUrl" name="imageUrl" type="file" accept="image/*" />
                  </div>
                </ScrollArea>
                <Button type="submit" className="mt-2">Add Product</Button>
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
                <ScrollArea className="h-[500px] w-full">
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
                    <Select name="role" required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Technician">Technician</SelectItem>
                      </SelectContent>
                    </Select>
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
                <Button type="submit" className="mt-2">Add Employee</Button>
              </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
