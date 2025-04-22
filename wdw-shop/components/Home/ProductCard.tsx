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
    <div className="p-4">
      <div className="w-[200px] h-[150px]">
        <Image
          src={product.image}
          alt={product.title}
          width={100}
          height={100}
          className="w-[80%] h-[80%] object-contain"
        />
      </div>
      <p className="mt-5 text-xs capitalize text-gray-600">
        {product.category}
      </p>
      <Link href={`/product/product-details/${product.id}`}>
        <h1 className="text-lg cursor-pointer hover:text-blue-900 transition-all hover:underline sm:w-full sm:truncate mt-2 text-black font-semibold">
          {product.title}
        </h1>
      </Link>
      <div className="flex items-center">
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
        <p className="text-black text-base line-through font-semibold opacity-50">
          ${(product.price + 10).toFixed(2)}
        </p>
        <p className="text-black text-lg font-bold opacity-80">
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
                isFavorite ? "bg-red-500" : "bg-gray-200 hover:bg-gray-300"
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
