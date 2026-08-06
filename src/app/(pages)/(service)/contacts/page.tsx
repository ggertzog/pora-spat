//libs
import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

//components
import ContactsPage from "@/core/components/pages/(contactsPage)/ContactsPage";

//query fetchers
import { getPageInfoBySlugQuery } from "@/core/api/queryFetchers/getPageInfoBySlug";

const slug = "contacts";

export default async function Contacts() {
  const { queryClient, data, error } = await getPageInfoBySlugQuery(slug);

  if (!data || error) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ContactsPage />
    </HydrationBoundary>
  );
}
