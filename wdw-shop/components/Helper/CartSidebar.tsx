import React from "react";
import Image from "next/image";
import { CartItem } from "@/store/cartSlice";

type Props = {
  items: CartItem[];
};

const CartSidebar = ({ items }: Props) => {
  return (
    <div className="mt-6 h-full mb-6">
      <h1 className="text-center font-bold text-lg mb-6">Your Cart</h1>
      {items.length == 0 && (
        <div className="flex items-center w-full h-[80vh] flex-col justify-center">
          <Image
            src="/images/cart.svg"
            alt="empty_cart"
            width={200}
            height={200}
            className="object-cover mx-auto"
          />
          <h1 className="mt-8 text-2xl font-semibold">Your Cart is empty</h1>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
