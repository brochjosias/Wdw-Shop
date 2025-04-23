"use client";

import { Product } from "@/typing";
import { StarIcon, ShoppingBag, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { toast } from "sonner";
import { addFavorite, removeFavorite } from "@/store/favoriteSlice";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FavoritesSidebar from "../Helper/FavoritesSidebar";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const num = Math.round(product.rating.rate);
  const ratingArray = new Array(num).fill(0);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isFavorite = favorites.some((item: Product) => item.id === product.id);

  const addToCartHandler = (product: Product) => {
    toast.success("Item Added to Cart", {
      description: `${product.title}`,
    });
    dispatch(
      addItem({
        ...product,
        quantity: 1,
      })
    );
  };

  const toggleFavoriteHandler = (product: Product) => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
      toast.info("Removed from Favorites", {
        description: `${product.title}`,
      });
    } else {
      dispatch(addFavorite(product));
      toast.success("Added to Favorites", {
        description: `${product.title}`,
      });
    }
  };

  return (
    <div className="w-full max-w-[250px] mx-auto p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square w-full relative">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        />
      </div>
      <p className="mt-4 text-xs capitalize text-gray-600">
        {product.category}
      </p>
      <Link href={`/product/product-details/${product.id}`}>
        <h1 className="text-base cursor-pointer hover:text-blue-900 transition-all line-clamp-2 mt-2 text-black font-semibold h-[3rem]">
          {product.title}
        </h1>
      </Link>
      <div className="flex items-center mt-1">
        {ratingArray.map((_, index) => (
          <StarIcon
            key={index}
            size={16}
            fill="yellow"
            className="text-yellow-500"
          />
        ))}
      </div>
      <div className="flex mt-2 items-center space-x-2">
        <p className="text-black text-sm line-through font-semibold opacity-50">
          ${(product.price + 10).toFixed(2)}
        </p>
        <p className="text-black text-base font-bold opacity-80">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <Button
          className="cursor-pointer"
          onClick={() => addToCartHandler(product)}
          size={"icon"}
        >
          <ShoppingBag size={18} />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className={`cursor-pointer ${
                isFavorite ? "bg-red-500" : "bg-gray-400 hover:bg-red-400"
              }`}
              onClick={(e) => {
                e.preventDefault();
                toggleFavoriteHandler(product);
              }}
            >
              <Heart size={18} fill={isFavorite ? "white" : "transparent"} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px]">
            <FavoritesSidebar />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ProductCard;
