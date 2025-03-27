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
  customerid: number;
  productid: number;
  issuedescription: string;
  repairstatus: string;
  assignedEmployeeId?: number;
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
    fetchEmployees();
    fetchCustomers();
  }, []);

  const handleToggle = () => {
    setIsToggled(true);
  };

  if (isToggled) {
    console.log("string: ", addTabStr);
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

  const handleStatusChange = async (repairId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/repairs/${repairId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repairstatus: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update repair status");
      }
      const updatedRepair = await response.json();
      setRepairs((prev) =>
        prev.map((r) => (r.repairid === repairId ? updatedRepair : r))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAssignEmployee = async (repairId: number, employeeId: string) => {
    try {
      const response = await fetch(`/api/repairs/${repairId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repairstatus: repairs.find(r => r.repairid === repairId)?.repairstatus,
          assignedEmployeeId: parseInt(employeeId, 10),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to assign employee");
      }
      const updatedRepair = await response.json();
      setRepairs((prev) =>
        prev.map((r) => (r.repairid === repairId ? updatedRepair : r))
      );
    } catch (error) {
      console.error("Error assigning employee:", error);
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
    <Tabs defaultValue="inventory" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="repair">Repair</TabsTrigger>
        <TabsTrigger value="employees">Employee</TabsTrigger>
        <TabsTrigger value="customers">Customer</TabsTrigger>
        <TabsTrigger value="add">Add</TabsTrigger>
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
            <ScrollArea className="h-[500px] w-full">
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
            <CardDescription>View and manage repair requests here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ScrollArea className="h-[500px] w-full">
              {repairs.length === 0 ? (
                <p>No repair requests available.</p>
              ) : (
                repairs.map((repair) => {
                  const customer = customers.find(c => c.customerid === repair.customerid);
                  const product = products.find(p => p.productid === repair.productid);
                  return (
                    <div key={repair.repairid} className="space-y-2 border p-2 rounded">
                      <p><strong>Repair ID:</strong> {repair.repairid}</p>
                      <p><strong>Customer:</strong> {customer ? `${customer.firstname} ${customer.lastname}` : 'Unknown'}</p>
                      <p><strong>Product:</strong> {product ? product.name : 'Unknown'}</p>
                      <p><strong>Issue:</strong> {repair.issuedescription}</p>
                      <div className="flex flex-col gap-1">
                        <strong>Status:</strong>
                        <Select
                          value={repair.repairstatus}
                          onValueChange={(value) => handleStatusChange(repair.repairid, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <strong>Assign Employee:</strong>
                        <Select
                          value={repair.assignedEmployeeId?.toString() || ""}
                          onValueChange={(value) => handleAssignEmployee(repair.repairid, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select employee" />
                          </SelectTrigger>
                          <SelectContent>
                            {employees.map((employee) => (
                              <SelectItem
                                key={employee.employeeid}
                                value={employee.employeeid.toString()}
                              >
                                {employee.firstname} {employee.lastname}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  );
                })
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
            <CardDescription>View all employee information here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ScrollArea className="h-[500px] w-full">
              {employees.length === 0 ? (
                <p>No employee information available.</p>
              ) : (
                employees.map((employee) => (
                  <div key={employee.employeeid} className="space-y-1 border p-2 rounded">
                    <p><strong>Employee ID:</strong> {employee.employeeid}</p>
                    <p><strong>Name:</strong> {employee.firstname} {employee.lastname}</p>
                    <p><strong>Role:</strong> {employee.role}</p>
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Phone Number:</strong> {employee.phonenumber}</p>
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
            <CardDescription>View all customer information here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ScrollArea className="h-[500px] w-full">
              {customers.length === 0 ? (
                <p>No customer information available.</p>
              ) : (
                customers.map((customer) => (
                  <div key={customer.customerid} className="space-y-1 border p-2 rounded">
                    <p><strong>Customer ID:</strong> {customer.customerid}</p>
                    <p><strong>Name:</strong> {customer.firstname} {customer.lastname}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone Number:</strong> {customer.phonenumber}</p>
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
              <CardTitle>Add Products</CardTitle>
              <div className="flex items-center pl-30 space-x-2">
                <Switch id="add-tab" onChange={handleToggle} /> <span />
                <Label htmlFor="add-employees">Employees</Label>
              </div>
            </div>
            <CardDescription>Add a new product to the inventory.</CardDescription>
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

      <TabsContent value="add">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{isToggled ? "Add Employee" : "Add Product"}</CardTitle>
              <div className="flex items-center space-x-2">
                <Switch
                  id="add-tab"
                  checked={isToggled}
                  onCheckedChange={setIsToggled}
                />
                <Label htmlFor="add-tab">Employees</Label>
              </div>
            </div>
            <CardDescription>
              {isToggled ? "Add a new employee." : "Add a new product to the inventory."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 ">
            {isToggled ? (
              <form onSubmit={handleAddEmployee} className="space-y-4 ">
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
                      <SelectTrigger>
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

            ) : (
              <form onSubmit={handleAddProduct} encType="multipart/form-data" className="space-y-4">
                <ScrollArea className="h-[500px] w-full">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                      <SelectTrigger>
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
                    <Label htmlFor="locationId">Location ID</Label>
                    <Input id="locationId" name="locationId" type="number" required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="condition">Condition</Label>
                    <Select name="condition" required>
                      <SelectTrigger>
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
            )}
          </CardContent>
        </Card>
      </TabsContent>


    </Tabs>
  );
}