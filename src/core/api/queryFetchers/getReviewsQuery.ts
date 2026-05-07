import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";
import { components } from "@/core/types/__generated__/api-schema";
import { KEY_REVIEWS } from "../constants/queryKeys";

const PATH = "/reviews" as const;

export type IReview = components['schemas']['ReviewResource']

export const reviewsQueryOptions = () =>
  queryOptions<IReview[]>({
    queryKey: [KEY_REVIEWS],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH);
      if (error) throw error;
      return data?.data ?? [];
    },
  });

export const useReviewsQuery = () => useQuery(reviewsQueryOptions());
