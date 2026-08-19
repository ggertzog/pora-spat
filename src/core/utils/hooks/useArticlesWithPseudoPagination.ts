"use client";

//libs
import { useState } from "react";

//query fetchers
import { useArticlesQuery } from "@/core/api/queryFetchers/getArticlesQuery";

//constants
import { ARTICLES_PAGE_SIZE } from "@/core/utils/constants";

// хук псевдопагинации - все статьи грузятся и кешируются ещё на стадии серверного рендеринга, тут управляем только видимостью
export const useArticlesWithPseudoPagination = () => {
  const [visibleSaleCount, setVisibleSaleCount] = useState(ARTICLES_PAGE_SIZE);
  const [visibleNewsCount, setVisibleNewsCount] = useState(ARTICLES_PAGE_SIZE);

  const { data: allArticles, isLoading, error } = useArticlesQuery();

  const saleArticles = allArticles?.filter((article) => article.type === "sale") || [];
  const newsArticles = allArticles?.filter((article) => article.type === "news") || [];

  const displayedSaleArticles = saleArticles.slice(0, visibleSaleCount);
  const displayedNewsArticles = newsArticles.slice(0, visibleNewsCount);

  const showMoreSaleArticles = () => {
    setVisibleSaleCount((prevCount) => prevCount + ARTICLES_PAGE_SIZE);
  };

  const showMoreNewsArticles = () => {
    setVisibleNewsCount((prevCount) => prevCount + ARTICLES_PAGE_SIZE);
  };

  const hasMoreSaleArticles = visibleSaleCount < saleArticles.length;
  const hasMoreNewsArticles = visibleNewsCount < newsArticles.length;

  return {
    saleArticles,
    newsArticles,
    displayedSaleArticles,
    displayedNewsArticles,
    showMoreSaleArticles,
    showMoreNewsArticles,
    hasMoreSaleArticles,
    hasMoreNewsArticles,
    isLoading,
    error,
  };
};
