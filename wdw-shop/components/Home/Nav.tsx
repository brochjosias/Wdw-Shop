"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Heart, UserIcon } from "lucide-react";
import ShopingCartButton from "../Helper/ShopingCartButton";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import FavoritesSidebar from "../Helper/FavoritesSidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Nav = () => {
  const [isClient, setIsClient] = useState(false);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="h-[12vh] sticky top-0 z-[1] bg-white shadow-md">
      <div className="flex items-center justify-between w-[95%] md:w-4/5 mx-auto h-full">
        {/* Logo */}
        <Link href="/">
          <Image src="/images/logo.png" alt="logo" width={140} height={140} />
        </Link>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Botão de Favoritos com Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <div className="relative cursor-pointer">
                <Heart size={26} />
                {isClient && favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </div>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px]">
              <FavoritesSidebar />
            </SheetContent>
          </Sheet>

          <ShopingCartButton />

          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <UserIcon size={26} className="cursor-pointer" />
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Nav;
