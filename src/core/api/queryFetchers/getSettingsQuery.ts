import { queryOptions, useQuery } from "@tanstack/react-query";
import { KEY_SETTINGS } from "../constants/queryKeys";
import { fetchClient } from "../fetchClient/fetchClient";
import { components } from "@/core/types/__generated__/api-schema";

const PATH = "/site-settings" as const;
export type ISettings = components["schemas"]["SiteSettingsResource"];

export const settingsQueryOptions = () =>
  queryOptions({
    queryKey: [KEY_SETTINGS],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH);
      if (error) throw error;
      return data?.data ?? null;
    },
  });

export const useSettingsQuery = () => useQuery(settingsQueryOptions());
