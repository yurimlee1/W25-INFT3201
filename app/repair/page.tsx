"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { toast } from "sonner";

// Define a type for the product
interface Product {
  productid: number; // or string, depending on how the product ID is defined in your API
  name: string;
}

export default function RepairPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    productId: '',
    issueDescription: '',
  });

  // Type the products state as an array of Product
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    toast("Event has been created.");

    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data); // Assuming the API returns the correct data structure
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Explicitly type the event parameter for handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleemailsend(event: React.FormEvent, subject: string, text: string) {
    event.preventDefault();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          text,
        }),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Explicitly type the event parameter for handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/repairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to submit repair request');
      toast.success('Repair request submitted successfully');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        productId: '',
        issueDescription: '',
      });

      handleemailsend(e, "Repair Request", `Repair request submitted successfully for ${formData.firstName} ${formData.lastName} with email ${formData.email} and phone number ${formData.phoneNumber}. Product ID: ${formData.productId}. Issue Description: ${formData.issueDescription}`);
      toast.success('Email sent successfully');

    } catch (error) {
      console.error('Error submitting repair request:', error);
      toast.error('Error submitting repair request');
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Submit Repair Request</h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productId">Product</Label>
            <Select
              value={formData.productId}
              onValueChange={(value) =>
                setFormData({ ...formData, productId: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem
                    key={product.productid}
                    value={product.productid.toString()}
                  >
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="issueDescription">Issue Description</Label>
            <Input
              id="issueDescription"
              name="issueDescription"
              value={formData.issueDescription}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="mt-4">
            Submit Request
          </Button>
        </form>
      </div>
    </div>
  );
}
