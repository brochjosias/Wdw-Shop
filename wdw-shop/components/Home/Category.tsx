"use client";
import { getAllCategory } from "@/Request/requests";
import { Loader } from "lucide-react";
import React, { useState } from "react";

interface CategoryProps {
  onSelectCategory: (category: string | null) => void;
}

const Category = ({ onSelectCategory }: CategoryProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: string[] = await getAllCategory();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  if (loading) {
    return (
      <div className="pt-16 pb-12 flex justify-center">
        <Loader size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-16 pb-12">
      <h1 className="text-center font-bold text-2xl capitalize">
        Shop by category
      </h1>

      <div className="mt-8 w-4/5 mx-auto grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* Botão All Products */}
        <div
          onClick={() => handleCategoryClick(null)}
          className={`p-3 rounded-lg cursor-pointer text-center hover:scale-105 transition-all duration-300 shadow-md ${
            selectedCategory === null ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <h1 className="text-xs sm:text-sm font-medium capitalize">
            All Products
          </h1>
        </div>

        {/* Demais categorias */}
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`p-3 rounded-lg cursor-pointer text-center hover:scale-105 transition-all duration-300 shadow-md ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <h1 className="text-xs sm:text-sm font-medium capitalize">
              {category}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
