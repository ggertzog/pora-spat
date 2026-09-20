//libs
import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";

//constants
import { KEY_BASKET } from "../constants/queryKeys";

//types
import { IProductShort } from "@/core/types/newapi";

const PATH = "/cart" as const;

export const basketQueryOptions = (slugs: string[]) =>
  queryOptions({
    queryKey: [KEY_BASKET, [...slugs].sort()],
    queryFn: async () => {
      const { data, error } = await fetchClient.POST(PATH, { body: { slugs } });
      if (error) throw error;
      return (data?.data ?? []) as IProductShort[];
    },
    enabled: slugs.length > 0,
    placeholderData: slugs.length >= 1 ? keepPreviousData : [],
  });

export const useBasketQuery = (slugs: string[]) => useQuery(basketQueryOptions(slugs));
