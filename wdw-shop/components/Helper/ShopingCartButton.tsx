import React from "react";
import { ShoppingBagIcon } from "lucide-react";

const ShopingCartButton = () => {
  return (
    <div className="relative">
      <span className="absolute -top-3 -right-2 w-6 h-6 bg-red-500 text-center flex items-center justify-center text-xs text-white rounded-full">
        6
      </span>
      <ShoppingBagIcon cursor="pointer" size={26} />
    </div>
  );
};

export default ShopingCartButton;
