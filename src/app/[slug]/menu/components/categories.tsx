"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartSheet from "./cart-sheet";
import Products from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: {
    products: true;
  };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);

  const { products, total, toggleCart, totalQuantity } =
    useContext(CartContext);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "outline";
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] h-28 rounded-t-3xl border bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={45}
            height={45}
          />
          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
          </div>
        </div>
        <div>
          <Image src="/rating.png" alt="Rating" width={55} height={26} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
        <ClockIcon size={12} />
        <p>Aberto</p>
      </div>
      <div></div>
      <ScrollArea className="w-full pt-4">
        <div className="flex w-max space-x-4 p-3 pt-5">
          {restaurant.menuCategories.map((category) => (
            <Button
              onClick={() => handleCategoryClick(category)}
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className="translate-y-0 transform rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
      <Products products={selectedCategory.products} />
      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between border-t bg-white px-5 py-3">
          <div>
            <p className="text-xs text-muted-foreground">Total dos pedidos</p>
            <p className="text-sm font-semibold">
              {formatCurrency(total)}
              <span className="text-xs font-normal text-muted-foreground">
                / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </p>
          </div>
          <Button variant="destructive" onClick={toggleCart}>
            Ver sacola
          </Button>
          <CartSheet />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategories;
