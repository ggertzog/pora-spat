//libs
import React from "react";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

//query fetchers
import { getArticleBySlugQuery } from "@/core/api/queryFetchers/getArticleBySlugQuery";

//components
import { ArticleDetailedPage } from "@/core/components/pages/(articleDetailedPage)/ArticleDetailedPage";

interface ArticleDetailedProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailed({ params }: ArticleDetailedProps) {
  const { slug } = await params;
  const { queryClient, data, seo, error } = await getArticleBySlugQuery(slug);

  if (error || !data) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticleDetailedPage slug={slug} />
    </HydrationBoundary>
  );
}
