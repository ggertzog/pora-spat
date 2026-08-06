import { queryOptions, useQuery } from "@tanstack/react-query";
import { KEY_HIT_SALES } from "../constants/queryKeys";
import { fetchClient } from "../fetchClient/fetchClient";
import { components } from "@/core/types/__generated__/api-schema";

const PATH = "/hits" as const;

export type IHitSale = components["schemas"]["OfferListResource"];

export const hitSalesQueryOpions = () =>
  queryOptions<IHitSale[]>({
    queryKey: [KEY_HIT_SALES],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH);
      if (error) throw error;
      return data?.data ?? [];
    },
  });

export const useHitSalesQuery = () => useQuery(hitSalesQueryOpions());
