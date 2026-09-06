"use client";
//libs
import React from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//types
import { ICategory } from "@/core/types/newapi";

//components
import ButtonCatalog from "@/core/components/ui/shared/ButtonCatalog/ButtonCatalog";

interface CategoriesListProps {
  className?: string;
  categories: ICategory[];
  activeCategory?: ICategory;
  setSelectedCategory: (category: ICategory) => void;
}

export const CategoriesList = ({ className, categories, activeCategory, setSelectedCategory }: CategoriesListProps) => {
  // Фильтрация на наличие подкатегорий или баннеров
  const filteredCategories = categories.filter(
    (item) => (item.banners && item.banners.length > 0) || (item.children && item.children.length > 0),
  );

  return (
    <ul className={clsx(css.categoriesList, className)}>
      {filteredCategories.map((item, index) => {
        return (
          <li key={item.id ?? index} onMouseEnter={() => setSelectedCategory(item)}>
            <ButtonCatalog
              text={item.name || ""}
              image={item.icon || ""}
              active={activeCategory?.id === item.id}
              onClick={() => setSelectedCategory(item)}
            />
          </li>
        );
      })}
    </ul>
  );
};
