//libs
import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";

//constants
import { KEY_BANNERS } from "../constants/queryKeys";

//types
import { IBanner } from "@/core/types/newapi";

const PATH = "/banners" as const;

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
