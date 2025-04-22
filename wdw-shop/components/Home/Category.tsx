"use client";
import { getAllCategory } from "@/Request/requests";
import { Loader } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface CategoryProps {
  onSelectCategory: (category: string | null) => void;
}

const Category = ({ onSelectCategory }: CategoryProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Efeito para carregar categorias
  useEffect(() => {
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

  // Efeito para manipular o scroll quando a âncora é acionada
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#categories" && titleRef.current) {
      const offset = 120; // Ajuste este valor conforme necessário
      const titlePosition = titleRef.current.getBoundingClientRect().top;
      const offsetPosition = titlePosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
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
    <section id="categories" className="scroll-mt-[7rem]">
      <div className="pt-16 pb-12">
        <h1
          ref={titleRef}
          className="text-center font-bold text-2xl capitalize"
        >
          Shop by category
        </h1>

        <div className="mt-12 w-4/5 mx-auto grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Botão All Products */}
          <div
            onClick={() => handleCategoryClick(null)}
            className={`p-4 rounded-lg cursor-pointer text-center hover:scale-105 transition-all duration-300 shadow-md ${
              selectedCategory === null
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <h1 className="text-sm sm:text-base md:text-lg font-medium capitalize">
              All Products
            </h1>
          </div>

          {/* Demais categorias */}
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`p-4 rounded-lg cursor-pointer text-center hover:scale-105 transition-all duration-300 shadow-md ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <h1 className="text-sm sm:text-base md:text-lg font-medium capitalize">
                {category}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Category;
