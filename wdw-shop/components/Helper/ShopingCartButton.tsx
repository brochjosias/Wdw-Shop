"use client";

import React, { useEffect, useState } from "react";
import { ShoppingBagIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import CartSidebar from "./CartSidebar";

const ShopingCartButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const items = useSelector((state: RootState) => state.cart.items);

  // Evitar hidratação no servidor
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  if (!isMounted) {
    return (
      <div className="relative">
        <ShoppingBagIcon className="cursor-pointer" size={26} />
      </div>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          {totalQuantity > 0 && (
            <span className="absolute -top-3 -right-2 w-6 h-6 bg-red-500 text-center flex items-center justify-center text-xs text-white rounded-full">
              {totalQuantity}
            </span>
          )}
          <ShoppingBagIcon className="cursor-pointer" size={26} />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-auto h-full">
        <SheetTitle className="sr-only">Shopping Cart</SheetTitle>
        <CartSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default ShopingCartButton;
