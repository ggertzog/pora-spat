//libs
import React from "react";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

//components
import AboutPage from "@/core/components/pages/(aboutPage)/AboutPage";

//query fetchers
import { getPageInfoBySlugQuery } from "@/core/api/queryFetchers/getPageInfoBySlug";

const slug = "about";

export default async function About() {
  const { queryClient, data, error } = await getPageInfoBySlugQuery(slug);

  if (error || !data) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AboutPage />
    </HydrationBoundary>
  );
}
