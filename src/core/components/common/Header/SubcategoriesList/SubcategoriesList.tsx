"use client";
//libs
import React from "react";
import Link from "next/link";

//styles
import css from "./styles.module.scss";

//types
import { ICategory } from "@/core/types/newapi";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";
import StockCard from "@/core/components/ui/shared/StockCard/StockCard";

interface SubcategoriesListProps {
  selectedCategory?: ICategory;
}

export const SubcategoriesList = ({ selectedCategory }: SubcategoriesListProps) => {
  return (
    <div className={css.subcategoriesWrap}>
      <div className={css.listContent}>
        <Typography as={Link} variant="h4" className={css.title} href={`catalog/${selectedCategory?.slug}`}>
          {selectedCategory?.name} <span className={css.count}>({selectedCategory?.count})</span>
        </Typography>
        <ul className={css.subcategoriesList}>
          {selectedCategory &&
            selectedCategory?.children?.map((item) => (
              <li key={item.id}>
                <Typography as={Link} href={`/catalog/${item.full_slug}`} variant="text2" className={css.link}>
                  {item.name}
                </Typography>
              </li>
            ))}
        </ul>
      </div>
      {selectedCategory?.banners?.[0] && <StockCard banner={selectedCategory?.banners?.[0]} className={css.bannerCard} />}
    </div>
  );
};
