"use client";
//libs
import React, { useLayoutEffect, useMemo, useState } from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//assets
import CloseIcon from "@p/assets/icons/close-square.svg";
import ChevronIcon from "@p/assets/icons/chevron-left-20.svg";

// query fetchers
import { useCategoriesQuery } from "@/core/api/queryFetchers/getCategoriesQuery";

//types
import { ICategory } from "@/core/types/newapi";

//components
import { Modal } from "@/core/components/common/Modal/Modal";
import SearchForm from "@/core/components/ui/shared/SearchForm/SearchForm";
import { CategoriesList } from "../CategoriesList/CategoriesList";
import { SubcategoriesList } from "../SubcategoriesList/SubcategoriesList";
import { BannersWrap } from "../BannersWrap/BannersWrap";

interface CatalogModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const SubcategoriesMarkup = ({ selectedCategory }: { selectedCategory: ICategory }) => {
  const hasOnlyBanners = Boolean(selectedCategory.banners?.length && selectedCategory.children?.length === 0);

  return hasOnlyBanners ? (
    <BannersWrap selectedCategory={selectedCategory} />
  ) : (
    <SubcategoriesList selectedCategory={selectedCategory} />
  );
};

export const CatalogModal = ({ className, isOpen, onClose }: CatalogModalProps) => {
  const cityId = 1;
  const { data } = useCategoriesQuery(cityId);

  const categories = useMemo(() => data?.filter((item) => item.count && item.count > 0), [data]);

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  const handleCloseCatalogModal = () => {
    onClose();
    setSelectedCategory(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseCatalogModal} catalog>
      <div className={clsx(css.catalogModal, className)} data-weight>
        <div className={css.searchWrap}>
          {selectedCategory && (
            <button className={css.backToCatalogButton} onClick={() => setSelectedCategory(null)}>
              <ChevronIcon />
            </button>
          )}
          <SearchForm />
          <button className={css.closeButton} onClick={handleCloseCatalogModal}>
            <CloseIcon />
          </button>
        </div>

        {!selectedCategory ? (
          <CategoriesList categories={categories || []} setSelectedCategory={setSelectedCategory} />
        ) : (
          <SubcategoriesMarkup selectedCategory={selectedCategory} />
        )}
      </div>
    </Modal>
  );
};
