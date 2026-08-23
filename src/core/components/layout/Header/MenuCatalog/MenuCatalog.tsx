"use client";
//libs
import React, { useId, useMemo, useState } from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//types
import { ICategory } from "@/core/types/newapi";

//query fetchers
import { useCategoriesQuery } from "@/core/api/queryFetchers/getCategoriesQuery";

//components
import ButtonCatalog from "@/core/components/ui/shared/ButtonCatalog/ButtonCatalog";

interface MenuCatalogProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen: boolean;
}

export const MenuCatalog = ({ className, style, isOpen }: MenuCatalogProps) => {
  const cityId = 1;
  const { data } = useCategoriesQuery(cityId);

  const key = useId();

  //фильтруем массив по наличию в нем элементов
  const categories = useMemo(() => data?.filter((item) => item.count && item.count > 0), [data]);

  const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>(undefined);

  //сбрасываем выбранную категорию при открытии меню
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) setSelectedCategory(undefined);
  }

  //пока пользователь ничего не навел — активна первая категория
  const activeCategory = selectedCategory ?? categories?.[0];

  return (
    <div className={clsx(css.menuCatalog, className)} style={style} aria-hidden={!isOpen}>
      <div className={css.container}>
        <div className={clsx(css.scrollContainer, css.leftScrollContainer)}>
          <ul className={css.categoriesList}>
            {categories?.map((item, index) => {
              return (
                <li key={key + index} onMouseEnter={() => setSelectedCategory(item)}>
                  <ButtonCatalog
                    text={item.name || ""}
                    image={item.icon || ""}
                    active={activeCategory?.id === item.id}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
};
