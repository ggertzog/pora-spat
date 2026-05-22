"use client";
//libs
import React, { useCallback, useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

//styles
import styles from "./styles.module.scss";
import "swiper/css";

//query fetchers
import { useBannersQuery } from "@/core/api/queryFetchers/getBannersQuery";

//components
import StockCard from "@/core/components/ui/shared/StockCard/StockCard";
import ButtonSlide from "@/core/components/ui/shared/ButtonSlide/ButtonSlide";
import Typography from "@/core/components/ui/shared/Typography/Typography";

//hooks
import { useMediaQuery } from "@/core/utils/hooks/useMediaQuery";

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

  const isXSLayout = useMediaQuery("(max-width: 767px)");

  return (
    <section className={styles.recommendationSestion}>
      <Typography className={styles.title} variant="h2" as="h2">
        Рекомендуем сегодня
      </Typography>
      <Swiper
        className={styles.swiperContainer}
        onSwiper={onSwiper}
        slidesPerView="auto"
        spaceBetween={16}
        centeredSlides={isXSLayout}
        centeredSlidesBounds={isXSLayout}
      >
        {banners?.map((banner) => (
          <SwiperSlide className={styles.swiperSlide} key={banner.id}>
            <StockCard banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
      {!isXSLayout && (
        <div className={styles.buttonsWrapper}>
          <ButtonSlide icon="arrowLeft" theme="dark" onClick={handlePrevClick} />
          <ButtonSlide icon="arrowRight" theme="dark" onClick={handleNextClick} />
        </div>
      )}
    </section>
  );
}
