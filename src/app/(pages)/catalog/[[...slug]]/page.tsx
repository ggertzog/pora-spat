//libs
import React from "react";
import { notFound } from "next/navigation";

//components
import { CatalogPage } from "@/core/components/pages/(catalogPage)/CatalogPage";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

//query fetchers
import { getCatalogProductsQuery } from "@/core/api/queryFetchers/getCatalogProductsQuery";

interface CatalogProps {
  params: Promise<{ slug: string }>;
}

export default async function Catalog({ params }: CatalogProps) {
  const { slug } = await params;
  const cityId = 1;
  const { queryClient, data, error } = await getCatalogProductsQuery({ initPage: 1, slug: slug, sort: "new", cityId });

  if (error || !data) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPage slug={slug} />
    </HydrationBoundary>
  );
}
