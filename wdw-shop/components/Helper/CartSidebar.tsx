import React from "react";
import Image from "next/image";
import { removeItem, updateQuantity } from "@/store/cartSlice";
import { Button } from "../ui/button";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const removeCartHandler = (id: number) => dispatch(removeItem({ id }));
  const updateQuantityHandler = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div className="mt-6 h-full mb-6 px-4">
      <h1 className="text-center font-bold text-lg mb-6">Your Cart</h1>

      {items.length === 0 ? (
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
      ) : (
        <div>
          {items.map((item) => (
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
                    ${(item.price * item.quantity).toFixed(2)}
                  </h1>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
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
                      <span className="text-base font-bold w-6 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
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
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <SheetClose asChild>
            <Link href="/cart" className="block mt-6">
              <Button className="w-full">View All Cart</Button>
            </Link>
          </SheetClose>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
