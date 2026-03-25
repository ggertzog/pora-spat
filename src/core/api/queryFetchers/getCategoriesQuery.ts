import { queryOptions, useQuery } from "@tanstack/react-query";
import { KEY_CATEGORIES } from "../constants/queryKeys";
import { fetchClient } from "../fetchClient/fetchClient";
import { components } from "@/core/types/__generated__/api-schema";

const PATH = "/menu" as const;

export type ICategory = components["schemas"]["ProductCategoryResource"];

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
