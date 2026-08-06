//libs
import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";

//constants
import { KEY_PAGE } from "../constants/queryKeys";

//types
import { IPageInfo, ISeoInfo } from "@/core/types/newapi";

//hooks
import { qetQueryClient } from "../query/getQueryClient";

const PATH = "/pages/{slug}" as const;

export type IPageInfoResponse = {
  data: IPageInfo;
  seo: ISeoInfo;
};

export const pageInfoBySlugQueryOptions = (slug: string) =>
  queryOptions<IPageInfoResponse>({
    queryKey: [KEY_PAGE, slug],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH, { params: { path: { slug } } });
      if (error) throw error;
      return data as IPageInfoResponse;
    },
  });

//серверный фетчер
export const getPageInfoBySlugQuery = async (slug: string) => {
  const queryClient = qetQueryClient();

  try {
    const pageData = await queryClient.fetchQuery(pageInfoBySlugQueryOptions(slug));
    return { queryClient, data: pageData.data, seo: pageData.seo, error: null };
  } catch (e) {
    console.error("getPageInfoBySlugQuery", e);
    return { queryClient, data: null, e };
  }
};

export const usePageInfoBySlugQueryOptions = (slug: string) => useQuery(pageInfoBySlugQueryOptions(slug));
