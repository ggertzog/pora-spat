//libs
import React from "react";

//styles
import css from "./styles.module.scss";

//types
import { ICategory } from "@/core/types/newapi";

//components
import StockCard from "@/core/components/ui/shared/StockCard/StockCard";
import clsx from "clsx";

interface BannersWrapProps {
  className?: string;
  selectedCategory: ICategory;
}

export const BannersWrap = ({ className, selectedCategory }: BannersWrapProps) => {
  return (
    <div className={clsx(css.bannersWrap, className)}>
      <ul className={css.bannersList}>
        {selectedCategory?.banners &&
          selectedCategory?.banners.length > 0 &&
          selectedCategory?.banners?.map((item) => (
            <li key={item.id} className={css.bannerItem}>
              <StockCard banner={item} className={css.bannerCard} />
            </li>
          ))}
      </ul>
    </div>
  );
};
