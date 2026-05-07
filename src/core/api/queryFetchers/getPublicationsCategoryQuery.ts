import { queryOptions, useQuery } from "@tanstack/react-query";
import { KEY_PUBLICATIONS_CATEGORY } from "../constants/queryKeys";
import { fetchClient } from "../fetchClient/fetchClient";
import { components } from "@/core/types/__generated__/api-schema";

const PATH = "/publications/categories" as const;
export type IPublicationCategory = components["schemas"]["PublicationsCategoryResource"];
// export type IPublicationCategory = components["schemas"]["PublicationsCategoryResource"];

export const publicationsCategoryQueryOptions = () =>
  queryOptions<IPublicationCategory[]>({
    queryKey: [KEY_PUBLICATIONS_CATEGORY],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH);
      if (error) throw error;
      return data?.data ?? [];
    },
  });

export const usePublicationsCategoryQuery = () => useQuery(publicationsCategoryQueryOptions());
