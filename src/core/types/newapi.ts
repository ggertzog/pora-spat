//types
import { components } from "./__generated__/api-schema";

export type ISeoInfo = components["schemas"]["SeoResource"];
export type IPageInfo = components["schemas"]["Page"];
export type IProductDetailed = components["schemas"]["OfferDetailResource"];
export type ITag = components["schemas"]["TagResource"];
export type IBanner = components["schemas"]["BannerResource"];
export type IProductShort = components["schemas"]["OfferListResource"];
export type IArticle = components["schemas"]["ArticleResource"];
export type ICategory = components["schemas"]["ProductCategoryResource"];

export type ISort = "new" | "cheaper" | "expensive";

export interface ILinks {
  first?: string;
  last?: string;
  prev?: string | null;
  next?: string | null;
}

export interface ICatalogProducts {
  data?: IProductShort[];
  links?: ILinks;
  meta?: IMeta;
  seo?: ISeoInfo;
  category_description_text?: string | null;
  category_description_image?: string | null;
}

export interface IMeta {
  current_page?: number;
  from?: number;
  last_page?: number;
  links?: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path?: string;
  per_page?: number;
  to?: number;
  total?: number;
}
