"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { Switch } from "./ui/switch";

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

interface Repair {
  repairid: number;
  customername: string;
  productname: string;
  issuedescription: string;
  repairstatus: string;
}

interface Customer {
  customerid: number;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: number;
}

interface Employee {
  employeeid: number;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  phonenumber: number;
}

export function AdminTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isToggled, setIsToggled] = useState(false);
  let addTabStr = 'add-product';

  useEffect(() => {
    fetchProducts();
    fetchRepairs();
  }, []);

  const handleToggle = () => {
    setIsToggled(true);
  };

  if (isToggled) {
    console.log("string: ",addTabStr);
    addTabStr = 'add-employee';
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepairs = async () => {
    try {
      const response = await fetch("/api/repairs");
      if (!response.ok) throw new Error("Failed to fetch repairs");
      const data = await response.json();
      setRepairs(data);
    } catch (error) {
      console.error("Error fetching repairs:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers");
      if (!response.ok) throw new Error("Failed to fetch customers");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((product) => product.productid !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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

  return (
    <Tabs defaultValue="inventory" className="w-[400px]">
      <TabsList className="grid w-[400px] grid-cols-5">
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="repair">Repair</TabsTrigger>
        <TabsTrigger value="employees">Employee</TabsTrigger>
        <TabsTrigger value="customers">Customer</TabsTrigger>
        <TabsTrigger value={addTabStr}>Add</TabsTrigger>
        {/* <TabsTrigger value="add-product">Add Product</TabsTrigger>
        <TabsTrigger value="add-employee">Add Employee</TabsTrigger> */}
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
            <ScrollArea className="h-70 w-full">
              {loading ? (
                <p>Loading products...</p>
              ) : products.length === 0 ? (
                <p>No products available.</p>
              ) : (
                products.map((product) => (
                  <div
                    key={product.productid}
                    className="space-y-1 border p-2 rounded"
                  >
                    <p>
                      <strong>Name:</strong> {product.name}
                    </p>
                    <p>
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p>
                      <strong>Condition:</strong> {product.condition}
                    </p>
                    <p>
                      <strong>Price:</strong> ${product.price}
                    </p>
                    <p>
                      <strong>Stock:</strong> {product.stockquantity}
                    </p>
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
            </ScrollArea>
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
            <CardDescription>View all repair requests here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ScrollArea className="h-70 w-full">
              {repairs.length === 0 ? (
                <p>No repair requests available.</p>
              ) : (
                repairs.map((repair) => (
                  <div
                    key={repair.repairid}
                    className="space-y-1 border p-2 rounded"
                  >
                    <p>
                      <strong>Repair ID:</strong> {repair.repairid}
                    </p>
                    <p>
                      <strong>Customer:</strong> {repair.customername}
                    </p>
                    <p>
                      <strong>Product:</strong> {repair.productname}
                    </p>
                    <p>
                      <strong>Issue:</strong> {repair.issuedescription}
                    </p>
                    <p>
                      <strong>Status:</strong> {repair.repairstatus}
                    </p>
                  </div>
                ))
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button onClick={fetchRepairs}>Refresh</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="employees">
        <Card>
          <CardHeader>
            <CardTitle>Employee Management</CardTitle>
            <CardDescription>
              View all employee information here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ScrollArea className="h-70 w-full">
              {employees.length === 0 ? (
                <p>No employee information available.</p>
              ) : (
                employees.map((employee) => (
                  <div
                    key={employee.employeeid}
                    className="space-y-1 border p-2 rounded"
                  >
                    <p>
                      <strong>Employee ID:</strong> {employee.employeeid}
                    </p>
                    <p>
                      <strong>Name:</strong> {employee.firstname}{" "}
                      {employee.lastname}
                    </p>
                    <p>
                      <strong>Role:</strong> {employee.role}
                    </p>
                    <p>
                      <strong>Email:</strong> {employee.email}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {employee.phonenumber}
                    </p>
                  </div>
                ))
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button onClick={fetchEmployees}>Refresh</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="customers">
        <Card>
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
            <CardDescription>
              View all customer information here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ScrollArea className="h-70 w-full">
              {customers.length === 0 ? (
                <p>No customer information available.</p>
              ) : (
                customers.map((customer) => (
                  <div
                    key={customer.customerid}
                    className="space-y-1 border p-2 rounded"
                  >
                    <p>
                      <strong>Customer ID:</strong> {customer.customerid}
                    </p>
                    <p>
                      <strong>Name:</strong> {customer.firstname} {customer.lastname}
                    </p>
                    <p>
                      <strong>Email:</strong> {customer.email}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {customer.phonenumber}
                    </p>
                  </div>
                ))
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button onClick={fetchCustomers}>Refresh</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="add-product">
        <Card>
          <CardHeader className="flex flex-col">
          <div className="flex items-center justify-between">
            <CardTitle>
              Add Products
            </CardTitle>
            <div className="flex items-center pl-30 space-x-2">
                <Switch 
                  id="add-tab" 
                  // checked={isToggled} // Bind the switch to the state
                  onChange={handleToggle}
                /> <span />
                <Label htmlFor="add-employees">Employees</Label>
            </div>
            </div>
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
