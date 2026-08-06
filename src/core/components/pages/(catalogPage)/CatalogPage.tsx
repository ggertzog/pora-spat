"use client";
//libs
import React from "react";

//styles
import css from "./styles.module.scss";

//query fetchers
import { useCatalogProductsOptions } from "@/core/api/queryFetchers/getCatalogProductsQuery";

//components
import { BreadCrumbs } from "@/core/components/common/BreadCrumbs/BreadCrumbs";
import CatalogCard from "@/core/components/ui/shared/CatalogCard/CatalogCard";

interface CatalogPageProps {
  slug: string;
}

export const CatalogPage = ({ slug }: CatalogPageProps) => {
  const cityId = 1;
  const { data: catalogProductsData } = useCatalogProductsOptions({ initPage: 1, slug, sort: "new", cityId });

  return (
    <section className={css.catalogPage}>
      <div className={css.container}>
        <BreadCrumbs
          crumbs={[
            { label: "Главная", href: "/" },
            { label: "Сделай динамческий слаг и текст лейбла", href: "/about" },
          ]}
        />
        {!!catalogProductsData && (
          <div className={css.catalogListWrap}>
            <ul className={css.catalogList}>
              {catalogProductsData.pages
                .flatMap((page) => page.data ?? [])
                .map((item, index) => (
                  <li key={item.id || index} className={css.catalogItem}>
                    <CatalogCard card={item} />
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
