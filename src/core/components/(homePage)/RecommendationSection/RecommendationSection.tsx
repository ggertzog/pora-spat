"use client";
import React, { useCallback, useRef } from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useBannersQuery } from "@/core/api/queryFetchers/getBannersQuery";
import StockCard from "../../ui/shared/StockCard/StockCard";
import ButtonSlide from "../../ui/shared/ButtonSlide/ButtonSlide";

export default function RecommendationSection() {
  const { data: banners } = useBannersQuery();

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

  return (
    <section className={styles.recommendationSestion}>
      <h2 className={styles.title}>Рекомендуем сегодня</h2>
      <Swiper className={styles.swiperContainer} onSwiper={onSwiper} slidesPerView="auto" spaceBetween={16}>
        {banners?.map((banner) => (
          <SwiperSlide className={styles.swiperSlide} key={banner.id}>
            <StockCard banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.buttonsWrapper}>
        <ButtonSlide icon="arrowLeft" theme="dark" onClick={handlePrevClick} />
        <ButtonSlide icon="arrowRight" theme="dark" onClick={handleNextClick} />
      </div>
    </section>
  );
}
