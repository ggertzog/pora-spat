//libs
import React from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//types
import { IProductShort } from "@/core/types/newapi";

//components
import SectionWrapper from "@/core/components/common/SectionWrapper/SectionWrapper";
import CatalogCard from "@/core/components/ui/shared/CatalogCard/CatalogCard";

interface FavouritesListProps {
  products: IProductShort[];
  isLoading?: boolean;
  className?: string;
}

export const FavouritesList = ({ products, isLoading, className }: FavouritesListProps) => {
  if (isLoading) return <SectionWrapper className={className}>Загрузка ...</SectionWrapper>;

  return (
    <SectionWrapper className={clsx(css.favouritesList, className)}>
      <ul className={css.list}>
        {products.map((item) => (
          <li key={item.slug} className={css.item}>
            <CatalogCard card={item} />
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
};
