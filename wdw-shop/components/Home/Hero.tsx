import React from "react";
import Image from "next/image";
import { Button } from "../ui/button"; // ajuste o caminho se necessário

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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga
            soluta sed justo voluptates labore, porro molestias quaerat a
            consequuntur dolorem! Libero unde, justo officiis sapiente veniam ab
            aperiam ad alias.
          </p>
          <div className="flex mt-6 items-center space-x-4">
            <Button size="lg" className="bg-blue-700 cursor-pointer">
              Shop Now
            </Button>
            <Button size="lg" className="cursor-pointer">
              Explore More
            </Button>
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
