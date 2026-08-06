import { queryOptions, useQuery } from "@tanstack/react-query";
import { KEY_MARKETPLACES } from "../constants/queryKeys";
import { fetchClient } from "../fetchClient/fetchClient";
import { components } from "@/core/types/__generated__/api-schema";

const PATH = "/marketplaces" as const;
export type IMarketplaces = components['schemas']['MarketplaceResource']

export const marketplacesQueryOptions = () =>
  queryOptions<IMarketplaces[]>({
    queryKey: [KEY_MARKETPLACES],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH);
      if(error) throw error;
      return data?.data ?? [];
    },
  });

export const useMarketplacesQuery = () => useQuery(marketplacesQueryOptions())
