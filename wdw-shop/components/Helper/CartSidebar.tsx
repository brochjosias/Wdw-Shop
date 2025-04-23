"use client";

import React from "react";
import Image from "next/image";
import { removeItem, updateQuantity } from "@/store/cartSlice";
import { Button } from "../ui/button";
import Link from "next/link";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { X } from "lucide-react";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const removeCartHandler = (id: number) => dispatch(removeItem({ id }));
  const updateQuantityHandler = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <SheetContent
      side="right"
      className="w-full h-full flex flex-col p-0 sm:max-w-md"
    >
      <SheetHeader className="border-b px-4 py-6 sticky top-2 bg-background z-10">
        <div className="flex items-center justify-center">
          <SheetTitle className="text-lg font-bold flex-grow text-center">
            Your Cart
          </SheetTitle>
          <SheetClose asChild className="ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </div>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-500">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Image
              src="/images/cart.svg"
              alt="empty_cart"
              width={200}
              height={200}
              className="object-cover mx-auto"
            />
            <h1 className="mt-8 text-2xl font-semibold">Your Cart is empty</h1>
          </div>
        ) : (
          <div className="space-y-6 py-2">
            {items.map((item) => (
              <div key={item.id} className="pb-4 border-b border-gray-200 pt-2">
                <div className="flex gap-4">
                  <div className="relative w-16 h-16 min-w-[64px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-sm font-semibold line-clamp-2">
                      {item.title}
                    </h1>
                    <p className="text-base font-bold text-primary mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 cursor-pointer"
                          onClick={() =>
                            updateQuantityHandler(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="text-base font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 cursor-pointer"
                          onClick={() =>
                            updateQuantityHandler(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        onClick={() => removeCartHandler(item.id)}
                        size="sm"
                        variant="destructive"
                        className="cursor-pointer"
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

      {items.length > 0 && (
        <div className="sticky bottom-0 border-t bg-background p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <SheetClose asChild>
            <Link href="/cart" className="block">
              <Button className="w-full cursor-pointer">
                Proceed to Checkout
              </Button>
            </Link>
          </SheetClose>
        </div>
      )}
    </SheetContent>
  );
};

export default CartSidebar;
