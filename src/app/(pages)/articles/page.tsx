//libs
import React from "react";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

//components
import { ArticlesPage } from "@/core/components/pages/(articlesPage)/ArticlesPage";

//query fetchers
import { getArticlesQuery } from "@/core/api/queryFetchers/getArticlesQuery";

export default async function Articles() {
  const { queryClient, data, error } = await getArticlesQuery();

  if (error || !data) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlesPage />
    </HydrationBoundary>
  );
}
