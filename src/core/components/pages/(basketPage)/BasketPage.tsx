"use client";
//libs
import React, { useMemo } from "react";
import clsx from "clsx";
import Image from "next/image";

//styles
import css from "./styles.module.scss";

//assets
import EmptyBasketImg from "@p/assets/images/empty-basket.png";

//stores
import { useBasket, useBasketIsHydrated } from "@/core/store/useBasketStore";

//query fetchers
import { useBasketQuery } from "@/core/api/queryFetchers/getPostBasketQuery";
import { useHitSalesQuery } from "@/core/api/queryFetchers/getHitSalesQuery";

//components
import { BreadCrumbs } from "@/core/components/common/BreadCrumbs/BreadCrumbs";
import SectionWrapper from "@/core/components/common/SectionWrapper/SectionWrapper";
import { TitleBlock } from "./TitleBlock/TitleBlock";
import { BasketCleaner } from "./BasketCleaner/BasketCleaner";
import { BasketSidebar } from "./BasketSidebar/BasketSidebar";
import { BasketCardList } from "./BasketCardList/BasketCardList";
import Typography from "@/core/components/ui/shared/Typography/Typography";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import ProductSection from "@/core/components/pages/(homePage)/ProductSection/ProductSection";

interface BasketPageProps {
  className?: string;
}

export const BasketPage = ({ className }: BasketPageProps) => {
  const basket = useBasket();
  const slugs = useMemo(() => basket.map((item) => item.slug), [basket]);
  const isHydrated = useBasketIsHydrated();
  const { data, isLoading } = useBasketQuery(slugs);
  const products = data ?? [];
  const isEmpty = isHydrated && !isLoading && products.length === 0;

  const { data: hitSales } = useHitSalesQuery();

  return (
    <div className={clsx(css.basketPage, className)}>
      <BreadCrumbs
        crumbs={[
          { label: "Главная", href: "/" },
          { label: "Доставка", href: "/delivery" },
        ]}
      />
      {!isEmpty ? (
        <SectionWrapper className={css.sectionWrapper}>
          <TitleBlock count={products.length} />
          <div className={css.contentBlock}>
            <div className={css.cardsWrap}>
              <BasketCleaner />
              <BasketCardList products={products} />
            </div>
            <BasketSidebar className={css.basketSidebar} products={products} />
          </div>
        </SectionWrapper>
      ) : (
        <>
          <SectionWrapper className={css.sectionWrapper}>
            <TitleBlock count={products.length} />
            <div className={css.emptyBlock}>
              <div className={css.emptyTextWrap}>
                <Typography className={css.emptyText} as="p" variant="text1">
                  Загляните на главную, чтобы выбрать товары или найдите нужное в поиске{" "}
                </Typography>
                <ButtonRounded
                  className={css.emptyButton}
                  as="router"
                  href="/"
                  size="h56"
                  variant="beige-main"
                  text="Перейти на главную"
                />
              </div>
              <div className={css.emptyBasketImgWrap}>
                <Image className={css.emptyBasketImg} src={EmptyBasketImg} alt="Корзина" fill />
              </div>
            </div>
          </SectionWrapper>
          {hitSales && (
            <ProductSection className={css.hitsBlock} cards={hitSales} title="Хиты продаж" bgColor="secondary" />
          )}
        </>
      )}
    </div>
  );
};
