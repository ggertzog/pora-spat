import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";
import { components } from "@/core/types/__generated__/api-schema";

const PATH = "/delivery-tomorrow" as const;
export type IDeliveryTomorrow = components["schemas"]["OfferListResource"];

export const deliveryTomorrowOption = () =>
  queryOptions<IDeliveryTomorrow[]>({
    queryKey: [],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH);
      if (error) throw error;
      return data?.data ?? [];
    },
  });

export const useDeliveryTomorrowQuery = () => useQuery(deliveryTomorrowOption());
