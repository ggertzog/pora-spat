"use client";
//libs
import React, { useMemo, useState } from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//query fetchers
import { useCategoriesQuery } from "@/core/api/queryFetchers/getCategoriesQuery";

//components
import { CategoriesList } from "../CategoriesList/CategoriesList";
import { SubcategoriesList } from "../SubcategoriesList/SubcategoriesList";
import { BannersWrap } from "../BannersWrap/BannersWrap";

interface MenuCatalogProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen: boolean;
}

export const MenuCatalog = ({ className, style, isOpen }: MenuCatalogProps) => {
  const cityId = 1;
  const { data } = useCategoriesQuery(cityId);

  //фильтруем массив по наличию в нем элементов
  const categories = useMemo(() => data?.filter((item) => item.count && item.count > 0), [data]);

  // Храним только id: сам объект выводим из categories при рендере,
  // поэтому не нужен эффект для синхронизации с подгружаемыми данными
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Если id ещё не выбран или категория пропала из ответа — берём первую
  const selectedCategory = useMemo(
    () => categories?.find((item) => item.id === selectedCategoryId) ?? categories?.[0],
    [categories, selectedCategoryId],
  );

  const hasOnlyBanners =
    selectedCategory &&
    selectedCategory.banners &&
    selectedCategory.banners.length > 0 &&
    selectedCategory.children?.length === 0;

  return (
    <div className={clsx(css.menuCatalog, className)} style={style} aria-hidden={!isOpen}>
      <div className={css.container}>
        <div className={clsx(css.scrollContainer, css.leftScrollContainer)}>
          {categories && (
            <CategoriesList
              categories={categories}
              activeCategory={selectedCategory}
              setSelectedCategory={(category) => setSelectedCategoryId(category.id ?? null)}
            />
          )}
        </div>
        <div className={clsx(css.scrollContainer, css.rightScrollContainer)}>
          {hasOnlyBanners ? (
            <BannersWrap selectedCategory={selectedCategory} />
          ) : (
            <SubcategoriesList selectedCategory={selectedCategory} />
          )}
        </div>
      </div>
    </div>
  );
};
