import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full h-[calc(100vh-12vh)] flex justify-center flex-col">
      {/* Define grid */}
      <div className="w-4/5 mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Content */}
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black font-bold uppercase">
            mega sale <span className="text-rose-600">Special</span> Offer up to{" "}
            <span className="text-orange-500">60%</span> off
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-black text-opacity-70 mt-4">
            Enjoy a convenient and seamless online shopping experience to find
            products anytime, anywhere. With strong payment and delivery
            support, WDW Shop wants to make it easier and safer for you to shop
            online. And that’s not all! We offer a Money Back Guarantee, which
            means your money is protected and only released to the sellers when
            you receive your order.
          </p>
          <div className="flex mt-6 items-center space-x-4">
            <Link href="#categories" passHref>
              <Button
                size="lg"
                className="bg-blue-700 cursor-pointer hover:bg-blue-800 transition-colors"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Image content */}
        <div className="hidden lg:block">
          <Image
            src="/images/hero.svg"
            alt="hero"
            width={600}
            height={600}
            className="lg:h-[50%] lg:w-[50%] xl:w-[80%] xl:h-[80%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
