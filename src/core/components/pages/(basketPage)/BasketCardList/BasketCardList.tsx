//libs
import React from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//types
import { IProductShort } from "@/core/types/newapi";

//components
import { BasketCard } from "../BasketCard/BasketCard";

interface BasketCardListProps {
  className?: string;
  products: IProductShort[];
}

export const BasketCardList = ({ className, products }: BasketCardListProps) => {
  return (
    <ul className={clsx(css.basketCardList, className)}>
      {products?.length > 0 &&
        products.map((item, index) => (
          <li key={index}>
            <BasketCard product={item} />
          </li>
        ))}
    </ul>
  );
};
