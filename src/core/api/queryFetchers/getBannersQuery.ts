import { components } from "@/core/types/__generated__/api-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { KEY_BANNERS } from "../constants/queryKeys";
import { fetchClient } from "../fetchClient/fetchClient";

const PATH = "/banners" as const;

export type IBanner = components["schemas"]["BannerResource"];

export const bannersQueryOptions = () =>
  queryOptions<IBanner[]>({
    queryKey: [KEY_BANNERS],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH);
      if (error) throw error;
      return data?.data ?? [];
    },
  });

export const useBannersQuery = () => useQuery(bannersQueryOptions());
