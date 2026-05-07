import { queryOptions, useQuery } from "@tanstack/react-query";
import { KEY_DISCOUNT } from "../constants/queryKeys";
import { fetchClient } from "../fetchClient/fetchClient";
import { components } from "@/core/types/__generated__/api-schema";

const PATH = "/discount-block" as const;
export type IDiscount = components["schemas"]["DiscountBlockResource"];
// export type IDiscount = Omit<components["schemas"]["DiscountBlockResource"], 'background_color' | 'title_color' | 'background_image'>

export const discountQueryOptions = () =>
  queryOptions<IDiscount>({
    queryKey: [KEY_DISCOUNT],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH);
      if (error) throw error;
      return data?.data || {};
    },
  });

export const useDiscountQuery = () => useQuery(discountQueryOptions());
