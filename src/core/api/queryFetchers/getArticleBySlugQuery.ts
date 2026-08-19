//libs
import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";
import { getQueryClient } from "../query/getQueryClient";

//constants
import { KEY_ARTICLES } from "../constants/queryKeys";

//types
import { IArticle, ISeoInfo } from "@/core/types/newapi";

const PATH = "/articles/{slug}" as const;

export type IArticleDetailed = {
  data: IArticle;
  seo: ISeoInfo;
};

//Настройки запроса
export const articleBySlugQuery = (slug: string) =>
  queryOptions<IArticleDetailed>({
    queryKey: [KEY_ARTICLES, slug],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH, { params: { path: { slug } } });
      if (error) throw error;
      return data as IArticleDetailed;
    },
  });

//Серверный фетчер
export const getArticleBySlugQuery = async (slug: string) => {
  const queryClient = getQueryClient();

  try {
    const articleData = await queryClient.fetchQuery(articleBySlugQuery(slug));
    return { queryClient, data: articleData.data, seo: articleData.seo, error: null };
  } catch (e) {
    console.error("getArticleBySlugQuery", e);
    return { queryClient, data: null, error: e };
  }
};

export const useArticleBySlugQuery = (slug: string) => useQuery(articleBySlugQuery(slug));
