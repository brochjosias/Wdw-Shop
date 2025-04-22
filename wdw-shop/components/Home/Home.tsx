"use client";
import React, { useState } from "react";
import Category from "@/components/Home/Category";
import AllProduct from "@/components/Home/AllProduct";
import Hero from "./Hero";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div>
      <Hero />
      <Category
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <AllProduct selectedCategory={selectedCategory} />
    </div>
  );
};

export default Home;
