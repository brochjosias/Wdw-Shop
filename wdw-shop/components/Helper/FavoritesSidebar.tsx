"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addItem } from "@/store/cartSlice";
import { removeFavorite } from "@/store/favoriteSlice";
import { toast } from "sonner";
import { Product } from "@/typing";
import { SheetTitle } from "../ui/sheet";

const FavoritesSidebar = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const addToCartHandler = (product: Product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
    toast.success("Added to cart", {
      description: product.title,
    });
  };

  const removeFavoriteHandler = (id: number) => {
    dispatch(removeFavorite(id));
    toast.info("Removed from favorites");
  };

  return (
    <div className="mt-6 h-full mb-6 px-4">
      <SheetTitle className="text-center font-bold text-lg mb-6">
        Your Favorites
      </SheetTitle>

      {favorites.length === 0 ? (
        <div className="flex items-center w-full h-[80vh] flex-col justify-center">
          <Image
            src="/images/heart.svg"
            alt="empty_favorites"
            width={200}
            height={200}
            className="object-cover mx-auto"
          />
          <h1 className="mt-8 text-2xl font-semibold">
            Your Favorites are empty
          </h1>
          <p className="text-gray-500 mt-2">
            Add some products to your favorites
          </p>
        </div>
      ) : (
        <div>
          {favorites.map((item: Product) => (
            <div
              key={item.id}
              className="pb-4 border-b-2 border-gray-300 border-opacity-60 p-4"
            >
              <div className="flex gap-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="object-cover rounded-md"
                />
                <div className="flex-1">
                  <h1 className="text-sm font-semibold line-clamp-2">
                    {item.title}
                  </h1>
                  <h1 className="text-base text-blue-950 font-bold mt-1">
                    ${item.price.toFixed(2)}
                  </h1>

                  <div className="flex items-center justify-between mt-4">
                    <Button size="sm" onClick={() => addToCartHandler(item)}>
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFavoriteHandler(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesSidebar;
