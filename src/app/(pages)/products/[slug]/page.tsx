//libs
import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

//components
import ProductPage from "@/core/components/pages/(productPage)/ProductPage";

//guery fetchers
import { getProducBySlugQuery } from "@/core/api/queryFetchers/getProductBySlugQuery";

interface ProductItemPageprops {
  params: Promise<{ slug: string }>;
}

export default async function ProductItemPage({ params }: ProductItemPageprops) {
  const { slug } = await params;
  const cityId = 1;
  const { queryClient, data, error } = await getProducBySlugQuery(slug, cityId);

  if (error || !data) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPage slug={slug} />
    </HydrationBoundary>
  );
}
