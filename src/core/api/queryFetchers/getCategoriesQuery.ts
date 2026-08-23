//libs
import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";

//constants
import { KEY_CATEGORIES } from "../constants/queryKeys";

//types
import { ICategory } from "@/core/types/newapi";

const PATH = "/menu" as const;

export const categoriesQueryOptions = (cityId?: number) =>
  queryOptions<ICategory[]>({
    queryKey: [KEY_CATEGORIES],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH, {
        params: { header: cityId != null ? { "X-City-Id": cityId } : {} },
      });
      if (error) throw error;
      return data?.data ?? [];
    },
  });

export const useCategoriesQuery = (cityId?: number) => useQuery(categoriesQueryOptions(cityId));
