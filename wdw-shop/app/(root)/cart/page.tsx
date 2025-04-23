"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { CartItem, addItem, clearCart, removeItem } from "@/store/cartSlice";
import { useUser } from "@clerk/nextjs";
import PayPalButton from "@/components/Helper/PayPalButton";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useUser();

  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cartCalculations = isClient
    ? {
        totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
        totalPrice: items
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2),
        vat: (
          +items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ) * 0.15
        ).toFixed(2),
        totalPriceWithVat: (
          +items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ) * 1.15
        ).toFixed(2),
      }
    : {
        totalQuantity: 0,
        totalPrice: "0.00",
        vat: "0.00",
        totalPriceWithVat: "0.00",
      };

  const addItemHandler = (item: CartItem) => dispatch(addItem(item));
  const removeItemHandler = (id: number) => dispatch(removeItem({ id }));
  const handleSuccess = () => {
    router.push("/success");
    dispatch(clearCart());
  };

  if (!isClient) {
    return (
      <div className="mt-8 min-h-[60vh]">
        <div className="flex items-center w-full h-[80vh] flex-col justify-center">
          <div className="w-[400px] h-[400px] bg-gray-200 animate-pulse rounded-md"></div>
          <div className="h-8 w-48 bg-gray-200 animate-pulse mt-8 rounded-md"></div>
          <div className="h-10 w-32 bg-gray-200 animate-pulse mt-4 rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 min-h-[60vh]">
      {items.length === 0 ? (
        <div className="flex items-center w-full h-[80vh] flex-col justify-center">
          <Image
            src="/images/cart.svg"
            alt="empty_cart"
            width={400}
            height={400}
            className="object-cover mx-auto"
            priority
          />
          <h1 className="mt-8 text-2xl font-semibold">Your Cart is empty</h1>
          <Link href="/">
            <Button className="mt-4">Shop Now</Button>
          </Link>
        </div>
      ) : (
        <div className="md:w-4/5 w-[95%] mx-auto grid grid-cols-1 xl:grid-cols-6 gap-8">
          {/* SEÇÃO DO CARRINHO (APENAS ESSA PARTE FOI MODIFICADA) */}
          <div className="rounded-lg shadow-lg overflow-hidden xl:col-span-4 border border-gray-200 bg-white">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Your Cart ({cartCalculations.totalQuantity} Items)
              </h1>
            </div>

            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex gap-6 items-start">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={120}
                      height={120}
                      className="rounded-lg border border-gray-200 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Category: {item.category}
                      </p>
                      <p className="text-lg font-bold text-blue-700 mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm font-medium mt-2">
                        Quantity: {item.quantity}
                      </p>

                      <div className="mt-4 flex gap-3">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                          onClick={() => addItemHandler(item)}
                        >
                          Add More
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="cursor-pointer"
                          onClick={() => removeItemHandler(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-2">
            <div className="bg-indigo-950 sticky top-[25vh] p-6 rounded-lg">
              <h1 className="text-center mt-8 mb-8 text-white text-3xl font-semibold">
                Summary
              </h1>
              <div className="w-full h-[1.2px] bg-white bg-opacity-20"></div>

              <div className="flex mt-4 text-xl uppercase font-semibold text-white items-center justify-between">
                <span>Subtotal</span>
                <span>${cartCalculations.totalPrice}</span>
              </div>

              <div className="flex mt-10 mb-10 text-xl uppercase font-semibold text-white items-center justify-between">
                <span>VAT</span>
                <span>${cartCalculations.vat}</span>
              </div>

              <div className="flex mb-6 text-xl uppercase font-semibold text-white items-center justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="w-full h-[1.2px] bg-white bg-opacity-20"></div>

              <div className="flex mt-6 mb-6 text-xl uppercase font-semibold text-white items-center justify-between">
                <span>Total</span>
                <span>${cartCalculations.totalPriceWithVat}</span>
              </div>

              {!user ? (
                <Link href="/sign-in">
                  <Button className="bg-orange-500 w-full hover:bg-orange-600">
                    Sign In to Checkout
                  </Button>
                </Link>
              ) : (
                <PayPalButton
                  amount={cartCalculations.totalPriceWithVat}
                  onSuccess={handleSuccess}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
