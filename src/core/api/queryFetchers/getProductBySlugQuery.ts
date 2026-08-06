//libs
import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";

//contants
import { KEY_PRODUCT } from "../constants/queryKeys";

//types
import { IProductDetailed, ISeoInfo } from "@/core/types/newapi";

//hooks
import { qetQueryClient } from "../query/getQueryClient";

const PATH = "/products/{slug}" as const;

export type IPageInfoResponse = {
  data: IProductDetailed;
  seo: ISeoInfo;
};

const productBySlugQueryOptions = (slug: string, cityId: number) =>
  queryOptions<IPageInfoResponse>({
    queryKey: [KEY_PRODUCT, slug, cityId],
    queryFn: async () => {
      const { data, error } = await fetchClient.GET(PATH, {
        headers: { "X-City-Id": String(cityId) },
        params: { path: { slug } },
      });
      if (error) throw error;
      return data as IPageInfoResponse;
    },
  });

//серверный фетчер
export const getProducBySlugQuery = async (slug: string, cityId: number) => {
  const queryClient = qetQueryClient();

  try {
    const productData = await queryClient.fetchQuery(productBySlugQueryOptions(slug, cityId));
    return { queryClient, data: productData.data, seo: productData.seo, error: null };
  } catch (e) {
    console.error("getProducBySlugQuery", e);
    return { queryClient, data: null, e };
  }
};

export const useProductBySlugQueryOptions = (slug: string, cityId: number) =>
  useQuery(productBySlugQueryOptions(slug, cityId));
