import createClient from "openapi-fetch";
import type { paths } from "@/core/types/__generated__/api-schema";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * Типизированный API-клиент.
 * Все пути и методы берутся из OpenAPI-схемы (paths).
 * Автодополнение и проверка типов для запросов/ответов.
 */
export const apiClient = createClient<paths>({
  baseUrl,
});

/**
 * Тип клиента для использования в других модулях
 * (например, для моков в тестах или кастомных обёрток).
 */
export type ApiClient = typeof apiClient;
