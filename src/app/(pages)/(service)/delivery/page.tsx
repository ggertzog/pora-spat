//libs
import React from "react";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

//query fetchers
import { getPageInfoBySlugQuery } from "@/core/api/queryFetchers/getPageInfoBySlug";

//components
import { DeliveryPage } from "@/core/components/pages/(deliveryPage)/DeliveryPage";

const slug = "delivery";

export default async function Delivery() {
  const { queryClient, data, error } = await getPageInfoBySlugQuery(slug);

  if (!data || error) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DeliveryPage />
    </HydrationBoundary>
  );
}
