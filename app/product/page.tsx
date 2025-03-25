import React from "react";
import Card from "@/components/card";

export default function ProductPage() {
  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Products</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="grid flex-1 grid-cols-3 items-start gap-4 p-4 2xl:grid-cols-4 items-center">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

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
  {
    id: 3,
    title: "Sonic the Hedgehog",
    description: "A fast-paced platformer with an iconic mascot.",
    price: 39.99,
    imageUrl: "/images/sonic.jpg", // Example image URL
  },
];
