//libs
import { useMutation } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";

//constants
import { KEY_PROMOCODE } from "../constants/queryKeys";

//types
import { IPromoCode } from "@/core/types/newapi";
import type { operations } from "@/core/types/__generated__/api-schema";

const PATH = "/promo-code/check" as const;

export type IPromocodeError = operations["getPromoCodeCheck"]["responses"][404]["content"]["application/json"];

//В схеме ответ описан плоским объектом, но бэк отдаёт его обёрнутым в data
type IPromocodeResponse = { data?: IPromoCode };

export const usePromocodeCheck = () =>
  useMutation<IPromoCode, IPromocodeError, string>({
    mutationKey: [KEY_PROMOCODE],
    mutationFn: async (code) => {
      const { data, error } = await fetchClient.GET(PATH, { params: { query: { code } } });
      if (error) throw error;
      return (data as IPromocodeResponse)?.data ?? {};
    },
  });
