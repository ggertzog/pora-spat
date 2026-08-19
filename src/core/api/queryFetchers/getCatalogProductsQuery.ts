//libs
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";
import { getQueryClient } from "../query/getQueryClient";

//constants
import { KEY_PRODUCTS } from "../constants/queryKeys";
import { CATALOG_PAGE_SIZE } from "@/core/utils/constants";

//types
import { ICatalogProducts } from "@/core/types/newapi";

const PATH = "/category/{slug}" as const;

//Типизация параметров
interface IParams {
  initPage?: number;
  slug: string;
  sort?: string;
  cityId?: number;
}

//Настройки запроса
export const infiniteCatalogProductsOptions = ({ initPage = 1, slug, sort, cityId }: IParams) =>
  infiniteQueryOptions({
    queryKey: [KEY_PRODUCTS, slug, initPage, sort, cityId],
    queryFn: async ({ pageParam = initPage }) => {
      const searchParams: Record<string, string | number> = {
        page: pageParam,
        perPage: CATALOG_PAGE_SIZE,
      };

      if (sort) {
        searchParams.sort = sort;
      }

      const { data, error } = await fetchClient.GET(PATH, {
        params: {
          query: searchParams,
          path: { slug },
          header: cityId ? { "X-City-Id": cityId } : undefined,
        },
      });
      if (error) throw error;
      return data as ICatalogProducts;
    },
    initialPageParam: initPage,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.meta?.current_page;
      const lastPageNum = lastPage?.meta?.last_page;
      return currentPage && lastPageNum && currentPage < lastPageNum ? currentPage + 1 : undefined;
    },
  });

//Серверный фетчер
export const getCatalogProductsQuery = async ({ initPage = 1, slug, sort, cityId }: IParams) => {
  const queryClient = getQueryClient();

  try {
    const data = await queryClient.fetchInfiniteQuery(infiniteCatalogProductsOptions({ initPage, slug, sort, cityId }));
    return { queryClient, data };
  } catch (error) {
    console.error("getCatalogProductsQuery", error);
    return { queryClient, data: null, error };
  }
};

// Хук запроса
export const useCatalogProductsOptions = ({ initPage = 1, slug, sort, cityId }: IParams) =>
  useInfiniteQuery(infiniteCatalogProductsOptions({ initPage, slug, sort, cityId }));
