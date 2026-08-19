//libs
import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";

//constants
import { KEY_ARTICLES } from "../constants/queryKeys";

//types
import { IArticle } from "@/core/types/newapi";

//hooks
import { getQueryClient } from "../query/getQueryClient";

const PATH = "/articles" as const;

export const articlesQueryOptions = () =>
  queryOptions<IArticle[]>({
    queryKey: [KEY_ARTICLES],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH);
      if (error) throw error;
      return data.data || [];
    },
  });

//серверный фетчер
export const getArticlesQuery = async () => {
  const queryClient = getQueryClient();

  try {
    const data = await queryClient.fetchQuery(articlesQueryOptions());
    return { queryClient, data, error: null };
  } catch (error) {
    console.error("getArticlesQuery", error);
    return { queryClient, data: null, error };
  }
};

export const useArticlesQuery = () => useQuery(articlesQueryOptions());
