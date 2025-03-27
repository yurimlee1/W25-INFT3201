'use client';
import React from "react";
import Card from "@/components/card";
import { useEffect, useState } from "react";



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


export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetchProducts();
    }, []);


    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        console.log("this is the data", data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };



  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Products</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="grid flex-1 grid-cols-3 items-start gap-4 p-4 2xl:grid-cols-4 items-center">
          {products.map((product) => (
            <Card key={product.productid} product={product} />
          ))}
        </div>
        
      </div>
    </div>
  );
}
