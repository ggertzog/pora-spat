"use client";
import React, { useCallback, useRef } from "react";
import styles from "./styles.module.scss";
import CategoryCard from "../../ui/shared/CategoryCard/CategoryCard";
import { useCategoriesQuery } from "@/core/api/queryFetchers/getCategoriesQuery";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import ButtonSlide from "../../ui/shared/ButtonSlide/ButtonSlide";
import { useMediaQuery } from "@/core/utils/hooks/useMediaQuery";

export default function CategorySection() {
  const { data: categories } = useCategoriesQuery();

  const filteredCategories = categories?.filter((category) => category.count && category.count > 0);

  const swiperRef = useRef<SwiperClass | null>(null);

  // Экземпляр Swiper
  const onSwiper = useCallback((swiper: SwiperClass) => {
    swiperRef.current = swiper;
  }, []);

  // Переход на предыдущий слайд
  const handlePrevClick = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  // Переход на следующий слайд
  const handleNextClick = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const isSMLayout = useMediaQuery("(max-width: 1023px)");
  const isXSLayout = useMediaQuery("(max-width: 767px)");

  return (
    <section className={styles.categorySection}>
      <Swiper
        className={styles.swiperContainer}
        onSwiper={onSwiper}
        slidesPerView="auto"
        spaceBetween={isXSLayout ? 10 : 16}
      >
        {filteredCategories?.map((category) => (
          <SwiperSlide className={styles.swiperSlide} key={category.id}>
            <CategoryCard key={category.id} category={category} size={isXSLayout ? "xs" : isSMLayout ? "sm" : "xl"} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* TODO: Сделать дизейбл кнопки вперед и назад если это первый или последний слайд */}
      {!isXSLayout && (
        <div className={styles.buttonsWrapper}>
          <ButtonSlide icon="arrowLeft" theme="dark" onClick={handlePrevClick} />
          <ButtonSlide icon="arrowRight" theme="dark" onClick={handleNextClick} />
        </div>
      )}
    </section>
  );
}
