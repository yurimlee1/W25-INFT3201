"use client";
import { OrderItem } from "@/components/order-item";
import React, { useEffect, useState } from "react";

export default function OrderPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    Promise.all(
      cart.map((id: number) =>
        fetch(`/api/products/${id}`).then((res) => res.json())
      )
    )
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
        setLoading(false);
      });
  }, []);

  const subtotal = products.reduce((acc, product) => {
    return acc + Number(product.price);
  }, 0);

  return (
    <div>
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {loading ? (
              <p>Loading...</p>
            ) : products.length === 0 ? (
              <p>No items in your cart.</p>
            ) : (
              products.map((product) => (
                <OrderItem
                  key={product.productid || product.id}
                  product={product}
                />
              ))
            )}
          </div>
          {/* Sub total */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  ${(subtotal + 4.99).toFixed(2)} CAD
                </p>
                <p className="text-sm text-gray-700">including TAX</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
