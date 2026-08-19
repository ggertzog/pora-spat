//libs
import { InfiniteData } from "@tanstack/react-query";

//styles
import css from "./styles.module.scss";

//types
import { ICatalogProducts } from "@/core/types/newapi";

//components
import CatalogCard from "@/core/components/ui/shared/CatalogCard/CatalogCard";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import SectionWrapper from "@/core/components/common/SectionWrapper/SectionWrapper";

interface CatalogListProps {
  catalogProductsData: InfiniteData<ICatalogProducts>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const CatalogList = ({ catalogProductsData, fetchNextPage, hasNextPage, isFetchingNextPage }: CatalogListProps) => {
  return (
    <SectionWrapper className={css.catalogListWrap}>
      <ul className={css.catalogList}>
        {catalogProductsData.pages
          .flatMap((page) => page.data ?? [])
          .map((item, index) => (
            <li key={item.id || index} className={css.catalogItem}>
              <CatalogCard card={item} />
            </li>
          ))}
      </ul>
      <ButtonRounded
        variant="beige-main"
        text="Показать ещё"
        className={css.moreButton}
        disabled={isFetchingNextPage || !hasNextPage}
        onClick={() => fetchNextPage()}
      />
    </SectionWrapper>
  );
};

export default CatalogList;
  