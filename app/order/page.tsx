import { OrderItem } from "@/components/order-item";
import React from "react";

const products = [
  {
    id: 1,
    title: "Super Mario Bros",
    description: "A classic 8-bit platformer game.",
    price: 49.99,
    imageUrl: "/images/super-mario.jpg", // You can replace this with actual image URLs
  },
  {
    id: 2,
    title: "The Legend of Zelda",
    description: "An iconic action-adventure game.",
    price: 59.99,
    imageUrl: "/images/zelda.jpg", // Example image URL
  },
];

export default function OrderPage() {
  return (
    <div>
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {products.map((product) => (
              <OrderItem key={product.id} product={product} />
            ))}
          </div>
          {/* Sub total */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">$129.99</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">$134.98 CAD</p>
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
