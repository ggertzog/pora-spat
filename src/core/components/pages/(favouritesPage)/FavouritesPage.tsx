"use client";
//libs
import React from "react";

//styles
import css from "./styles.module.scss";

//stores
import { useFavourites, useFavouritesIsHydrated } from "@/core/store/useFavouritesStore";

//query fetchers
import { useFavouritesQuery } from "@/core/api/queryFetchers/getFavouritesQuery";

//components
import { BreadCrumbs } from "@/core/components/common/BreadCrumbs/BreadCrumbs";
import TitleBlock from "./TitleBlock/TitleBlock";
import { FavouritesList } from "./FavouritesList/FavouritesList";

export const FavouritesPage = () => {
  const crumbs = [
    { label: "Главная", href: "/" },
    { label: "Избранное", href: "/favourites" },
  ];

  const favourites = useFavourites();
  const isHydrated = useFavouritesIsHydrated();
  const { data, isLoading } = useFavouritesQuery(favourites);
  const products = data ?? [];
  const isEmpty = isHydrated && !isLoading && products.length === 0;

  return (
    <div className={css.favouritesPage}>
      <BreadCrumbs crumbs={crumbs} />
      <TitleBlock title={isEmpty ? "Вы не добавили товары в Избранное..." : "Избранное"} count={products.length} />
      {!isEmpty && <FavouritesList products={products} isLoading={!isHydrated || isLoading} />}
    </div>
  );
};
