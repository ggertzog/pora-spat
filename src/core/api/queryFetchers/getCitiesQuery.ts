//libs
import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";

//constants
import { KEY_CITIES, KEY_CITY } from "../constants/queryKeys";

//types
import { components } from "@/core/types/__generated__/api-schema";

const PATH = "/cities" as const;
export type ICity = components["schemas"]["City"];

export const cityInfoListQueryOptions = () =>
  queryOptions<ICity[]>({
    queryKey: [KEY_CITIES],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH);
      if (error) throw error;
      return data || [];
    },
  });

export const cityInfoQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [KEY_CITY, String(id)],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(`${PATH}/{id}`, { params: { path: { id } } });
      if (error) throw error;
      return data || {};
    },
  });

export const useCitiesInfoListQuery = () => useQuery(cityInfoListQueryOptions());
export const useCityInfoQuery = (id: number) => useQuery(cityInfoQueryOptions(id));
