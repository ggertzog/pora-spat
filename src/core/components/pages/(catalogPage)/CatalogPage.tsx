"use client";
//libs
import React, { useState } from "react";

//styles
import css from "./styles.module.scss";

//query fetchers
import { useCatalogProductsOptions } from "@/core/api/queryFetchers/getCatalogProductsQuery";
import { useCategoriesQuery } from "@/core/api/queryFetchers/getCategoriesQuery";

//components
import { BreadCrumbs } from "@/core/components/common/BreadCrumbs/BreadCrumbs";
import CatalogList from "./CatalogList/CatalogList";
import AboutSection from "@/core/components/common/AboutSection/AboutSection";
import TitleBlock from "./TitleBlock/TitleBlock";

interface CatalogPageProps {
  slug: string;
  category?: string;
  subcategory?: string;
}

export const CatalogPage = ({ slug, category, subcategory }: CatalogPageProps) => {
  const cityId = 1;
  const [activeSort, setActiveSort] = useState("new");
  const {
    data: catalogProductsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCatalogProductsOptions({ initPage: 1, slug, sort: activeSort, cityId });
  const { data: categoryData } = useCategoriesQuery(cityId);

  const currentCategoryData = categoryData?.find((item) => item.slug === category);
  const currentSubcategoryData = currentCategoryData?.children?.find((item) => item.slug === subcategory);

  const title = currentSubcategoryData
    ? currentSubcategoryData.menu_title || currentSubcategoryData.name
    : currentCategoryData
      ? currentCategoryData.menu_title || currentCategoryData.name
      : "";

  const count = catalogProductsData?.pages[0]?.meta?.total || 0;

  const crumbs = [{ label: "Главная", href: "/" }];

  if (currentCategoryData) {
    crumbs.push({
      label: currentCategoryData.menu_title || currentCategoryData.name || "",
      href: `/catalog/${category}`,
    });
  }

  if (currentSubcategoryData) {
    crumbs.push({
      label: currentSubcategoryData.menu_title || currentSubcategoryData.name || "",
      href: `/catalog/${category}/${subcategory}`,
    });
  }

  return (
    <div className={css.catalogPage}>
      <BreadCrumbs crumbs={crumbs} />
      <TitleBlock
        title={title || ""}
        count={count}
        categoryData={currentCategoryData}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
      />
      {!!catalogProductsData && (
        <CatalogList
          catalogProductsData={catalogProductsData}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
      {!!catalogProductsData && (
        <AboutSection
          className={css.catalogAbout}
          htmlData={catalogProductsData?.pages?.[0]?.category_description_text}
          image={catalogProductsData?.pages?.[0]?.category_description_image}
        />
      )}
    </div>
  );
};
