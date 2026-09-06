//libs
import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";

//constants
import { KEY_RUNNING_LINE } from "../constants/queryKeys";

//types
import { components } from "@/core/types/__generated__/api-schema";

export type IRunningLine = components["schemas"]["RunningLineResource"];

const PATH = "/running-lines" as const;

export const runningLineQueryOptions = () =>
  queryOptions<IRunningLine[]>({
    queryKey: [KEY_RUNNING_LINE],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH);
      if (error) throw error;
      return data?.data ?? [];
    },
  });

export const useRunningLineQuery = () => useQuery(runningLineQueryOptions());
