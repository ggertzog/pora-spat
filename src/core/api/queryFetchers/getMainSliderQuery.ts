import { queryOptions, useQuery } from "@tanstack/react-query";
import { KEY_MAIN_SLIDER } from "../constants/queryKeys";
import { fetchClient } from "../fetchClient/fetchClient";
import { components } from "@/core/types/__generated__/api-schema";

const PATH = "/sliders" as const;

export type ISlide = components["schemas"]["SliderResource"];

export const mainSliderQueryOptions = () =>
  queryOptions<ISlide[]>({
    queryKey: [KEY_MAIN_SLIDER],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH);
      if (error) throw error;
      return data?.data ?? [];
    },
  });

export const useMainSliderQuery = () => useQuery(mainSliderQueryOptions());
