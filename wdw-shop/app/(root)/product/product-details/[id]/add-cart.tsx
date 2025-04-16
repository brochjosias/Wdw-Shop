"use client";
import { Button } from "@/components/ui/button";
import { addItem } from "@/store/cartSlice";
import { Product } from "@/typing";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const AddToCart = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  const addCartHandler = () => {
    toast.success("Item added to cart", {
      description: `${product.title} was added to your cart`,
    });
    dispatch(addItem(product));
  };

  return (
    <Button onClick={addCartHandler} className="mt-6">
      Add to Cart
    </Button>
  );
};

export default AddToCart;
