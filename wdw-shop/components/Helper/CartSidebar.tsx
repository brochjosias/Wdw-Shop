import React from "react";
import Image from "next/image";
import { addItem, CartItem, removeItem } from "@/store/cartSlice";
import { Button } from "../ui/button";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";
import { useDispatch } from "react-redux";

type Props = {
  items: CartItem[];
};

const CartSidebar = ({ items }: Props) => {
  const dispatch = useDispatch();
  const addCartHandler = (item: CartItem) => dispatch(addItem(item));
  const removeCartHandler = (id: number) => dispatch(removeItem({ id }));

  return (
    <div className="mt-6 h-full mb-6 px-4">
      <h1 className="text-center font-bold text-lg mb-6 ">Your Cart</h1>

      {items.length === 0 && (
        <div className="flex items-center w-full h-[80vh] flex-col justify-center ">
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

      {items.length > 0 && (
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="pb-4 border-b-2 border-gray-300 border-opacity-60 p-4 "
            >
              <div>
                <div>
                  <div>
                    <div>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="object-cover mb-4"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mova estas seções para dentro do map */}
              {/* title */}
              <h1 className="text-sm w-4/5 font-semibold truncate">
                {item.title}
              </h1>

              {/* price */}
              <h1 className="text-base text-blue-950 font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </h1>

              {/* Quantity */}
              <h1 className="text-base font-bold mb-2">
                Quantity: {item.quantity}
              </h1>

              {/* Two buttons one for add and one for remove */}
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => removeCartHandler(item.id)}
                  size="sm"
                  variant="destructive"
                >
                  Remove
                </Button>
                <Button onClick={() => addCartHandler(item)} size="sm">
                  Add
                </Button>
              </div>
            </div>
          ))}

          <Link href="/cart">
            <SheetClose>
              <Button className="w-full mb-6 mt-6 ">View All Cart</Button>
            </SheetClose>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
