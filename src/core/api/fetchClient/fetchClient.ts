import createClient from "openapi-fetch";
import type { paths } from "@/core/types/__generated__/api-schema";

const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;

export const fetchClient = createClient<paths>({
    baseUrl: `${BASE_URL}`,
});