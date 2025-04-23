// app/product/product-details/[id]/page.tsx
import React from "react";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { getProductByCategory, getSingleProduct } from "@/Request/requests";
import { Product } from "@/typing";
import AddToCart from "./add-cart";
import ProductCard from "@/components/Home/ProductCard";
import { PageProps } from "next";

interface ProductPageParams {
  id: string;
}

export default async function ProductDetails({
  params,
}: PageProps<ProductPageParams>) {
  // Verify if ID exists
  if (!params?.id) {
    return <div className="mt-28 text-center">No product ID provided</div>;
  }

  try {
    const singleProduct: Product = await getSingleProduct(params.id);
    const relatedProducts: Product[] = await getProductByCategory(
      singleProduct?.category || "electronics"
    );

    // If product not found
    if (!singleProduct) {
      return <div className="mt-28 text-center">Product not found</div>;
    }

    const rating = Math.round(singleProduct?.rating?.rate || 0);
    const starArray = rating > 0 ? new Array(rating).fill(0) : [];

    return (
      <div className="mt-28">
        <div className="w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-7 items-center gap-4">
          {/* Product Image */}
          {singleProduct?.image && (
            <div className="col-span-3 mb-6 lg:mb-0">
              <Image
                src={singleProduct.image}
                alt={singleProduct.title || "Product image"}
                width={400}
                height={400}
                className="object-contain"
                priority
              />
            </div>
          )}

          {/* Product Content */}
          <div className="col-span-4">
            <h1 className="lg:text-3xl text-2xl font-bold text-black">
              {singleProduct?.title || "No title available"}
            </h1>

            <div className="mt-2 flex items-center space-x-2">
              <div className="flex items-center">
                {starArray.map((_, index) => (
                  <StarIcon
                    key={index}
                    size={20}
                    fill="yellow"
                    className="text-yellow-600"
                  />
                ))}
              </div>
              <p className="text-base text-gray-700 font-semibold">
                ({singleProduct?.rating?.count || 0} Reviews)
              </p>
            </div>

            <span className="w-1/4 h-[1.6px] bg-gray-400 rounded-lg block mt-4 opacity-20 mb-4"></span>

            <h1 className="lg:text-6xl text-3xl md:text-4xl text-blue-950 font-bold">
              $
              {typeof singleProduct?.price === "number"
                ? singleProduct.price.toFixed(2)
                : "0.00"}
            </h1>

            <p className="mt-4 text-base text-black opacity-70">
              {singleProduct?.description || "No description available"}
            </p>

            <p className="mt-4 text-sm text-black text-opacity-70 font-semibold">
              Category: {singleProduct?.category || "Uncategorized"}
            </p>

            <p className="mt-2 text-sm text-black text-opacity-70 font-semibold">
              Tag: Shop, MDM
            </p>

            <p className="mt-2 text-sm text-black text-opacity-70 font-semibold">
              SKU: {Math.floor(Math.random() * 500)}
            </p>

            <AddToCart product={singleProduct} />
          </div>
        </div>

        {/* Related Products */}
        <div className="w-4/5 mt-16 mx-auto">
          <h1 className="text-2xl text-black font-semibold">
            Related Products
          </h1>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {relatedProducts
              ?.filter((product) => product.id !== singleProduct.id)
              ?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load product:", error);
    return (
      <div className="mt-28 text-center">
        <h2 className="text-2xl font-bold">Error loading product</h2>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }
}
