//libs
import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";

//constants
import { KEY_FAVOURITES } from "../constants/queryKeys";

//types
import { IProductShort } from "@/core/types/newapi";

const PATH = "/favorite" as const;

export const favouritesQueryOptions = (slugs: string[]) =>
  queryOptions({
    // сортируем, чтобы порядок добавления не плодил разные записи в кэше
    queryKey: [KEY_FAVOURITES, [...slugs].sort()],
    queryFn: async () => {
      const { data, error } = await fetchClient.POST(PATH, { body: { slugs } });
      if (error) throw error;
      return (data?.data ?? []) as IProductShort[];
    },
    enabled: slugs.length > 0,
    placeholderData: slugs.length >= 1 ? keepPreviousData : [],
  });

export const useFavouritesQuery = (slugs: string[]) => useQuery(favouritesQueryOptions(slugs));
