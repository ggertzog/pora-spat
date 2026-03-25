import { queryOptions, useQuery } from "@tanstack/react-query";
import { KEY_TAGS } from "../constants/queryKeys";
import { fetchClient } from "../fetchClient/fetchClient";
import { components } from "@/core/types/__generated__/api-schema";

const PATH = "/tags" as const;

export type ITag = components["schemas"]["TagResource"];

export const tagsQueryOptions = () =>
  queryOptions<ITag[]>({
    queryKey: [KEY_TAGS],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH);
      if (error) throw error;
      return data?.data ?? [];
    },
  });

export const useTagsQuery = () => useQuery(tagsQueryOptions());
