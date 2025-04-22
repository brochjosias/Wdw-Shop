"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import ProductCard from "@/components/Home/ProductCard";
import { Product } from "@/typing";

const FavoritesPage = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Favorites</h1>
        <Link href="/">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold">
            Your favorites list is empty
          </h2>
          <p className="text-gray-600 mt-2">
            Save your favorite items here for easy access later
          </p>
          <Link href="/">
            <Button className="mt-4">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
