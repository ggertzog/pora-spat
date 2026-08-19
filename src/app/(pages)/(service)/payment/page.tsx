//libs
import React from "react";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

//query fetchers
import { getPageInfoBySlugQuery } from "@/core/api/queryFetchers/getPageInfoBySlug";

//components
import { PaymentPage } from "@/core/components/pages/(paymentPage)/PaymentPage";

const slug = "payment";

export default async function Payment() {
  const { queryClient, data, error } = await getPageInfoBySlugQuery(slug);

  if (!data || error) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PaymentPage />
    </HydrationBoundary>
  );
}
