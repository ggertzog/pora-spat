//libs
import React from "react";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

//query fetchers
import { getPageInfoBySlugQuery } from "@/core/api/queryFetchers/getPageInfoBySlug";

//components
import { ExchangeAndRefundPage } from "@/core/components/pages/(exchangeAndRefundPage)/ExchangeAndRefundPage";

const slug = "exchange-and-refund";

export default async function ExchangeAndRefund() {
  const { queryClient, data, error } = await getPageInfoBySlugQuery(slug);

  if (!data || error) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExchangeAndRefundPage />
    </HydrationBoundary>
  );
}
