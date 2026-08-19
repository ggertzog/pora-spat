"use client";
//libs
import React, { useState } from "react";

//styles
import css from "./styles.module.scss";

//components
import { BreadCrumbs } from "@/core/components/common/BreadCrumbs/BreadCrumbs";
import SectionWrapper from "@/core/components/common/SectionWrapper/SectionWrapper";
import NewsCard from "@/core/components/ui/shared/NewsCard/NewsCard";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import Typography from "@/core/components/ui/shared/Typography/Typography";

//assets
import BedImage from "@p/assets/images/bed.png";

//hooks
import { useArticlesWithPseudoPagination } from "@/core/utils/hooks/useArticlesWithPseudoPagination";

type TArticlesTab = "sale" | "news";

export const ArticlesPage = () => {
  const crumbs = [
    { label: "Главная", href: "/" },
    { label: "Акции и Новости", href: "/articles" },
  ];

  const [activeTab, setActiveTab] = useState<TArticlesTab>("sale");

  const {
    displayedSaleArticles,
    displayedNewsArticles,
    showMoreSaleArticles,
    showMoreNewsArticles,
    hasMoreSaleArticles,
    hasMoreNewsArticles,
  } = useArticlesWithPseudoPagination();

  const isSaleTab = activeTab === "sale";
  const displayedArticles = isSaleTab ? displayedSaleArticles : displayedNewsArticles;
  const hasMoreArticles = isSaleTab ? hasMoreSaleArticles : hasMoreNewsArticles;
  const showMoreArticles = isSaleTab ? showMoreSaleArticles : showMoreNewsArticles;

  return (
    <div className={css.articlesPage}>
      <BreadCrumbs crumbs={crumbs} />
      <SectionWrapper className={css.articlesWrap}>
        <div className={css.titleWrap}>
          <Typography as="h1" variant="h1" className={css.title}>
            Акции и новости
          </Typography>
          <div className={css.devider}></div>
        </div>

        <div className={css.tabs}>
          <ButtonRounded
            as="button"
            variant="tab"
            size="h43"
            text="Акции"
            className={isSaleTab ? css.tabActive : undefined}
            onClick={() => setActiveTab("sale")}
          />
          <ButtonRounded
            variant="tab"
            size="h43"
            text="Новости"
            className={!isSaleTab ? css.tabActive : undefined}
            onClick={() => setActiveTab("news")}
          />
        </div>
        <ul className={css.grid}>
          {displayedArticles.map((article) => (
            <li key={article.id} className={css.gridItem}>
              <NewsCard
                link={`/articles/${article.slug}`}
                image={article.image || BedImage}
                title={article.title || ""}
                subtitle={article.description || ""}
                date={article.date ? new Date(article.date).toLocaleDateString("ru-RU") : ""}
              />
            </li>
          ))}
        </ul>
        {hasMoreArticles && (
          <ButtonRounded
            variant="beige-main"
            text="Смотреть ещё"
            className={css.moreButton}
            onClick={showMoreArticles}
          />
        )}
      </SectionWrapper>
    </div>
  );
};
