//libs
import { useMutation } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient/fetchClient";

//constants
import { KEY_APPEAL } from "../constants/queryKeys";

//types
import type { operations } from "@/core/types/__generated__/api-schema";

const PATH = "/request/appeal" as const;

type AppealBody = operations["createAppeal"]["requestBody"]["content"]["multipart/form-data"];

export type IAppealResponse = operations["createAppeal"]["responses"][201]["content"]["application/json"];
export type IAppealError = operations["createAppeal"]["responses"][422]["content"]["application/json"];

export const useFeedbackForm = () =>
  useMutation<IAppealResponse, IAppealError, FormData>({
    mutationKey: [KEY_APPEAL],
    mutationFn: async (formData) => {
      const { data, error } = await fetchClient.POST(PATH, {
        body: formData as unknown as AppealBody,
      });
      if (error) throw error;
      return data;
    },
  });
