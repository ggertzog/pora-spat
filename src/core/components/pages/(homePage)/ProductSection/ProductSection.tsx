"use client";
//libs
import React, { useCallback, useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

//styles
import styles from "./styles.module.scss";
import "swiper/css";

//components
import ButtonSlide from "@/core/components/ui/shared/ButtonSlide/ButtonSlide";
import ProductCard from "@/core/components/ui/shared/ProductCard/ProductCard";
import Typography from "@/core/components/ui/shared/Typography/Typography";

//types
import { IHitSale } from "@/core/api/queryFetchers/getHitSalesQuery";

//query fetchers
import { useMediaQuery } from "@/core/utils/hooks/useMediaQuery";

interface IProductSection {
  bgColor: "main" | "secondary";
  cards: IHitSale[];
  title: string;
}

export default function ProductSection({ cards = [], title, bgColor }: IProductSection) {
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

  const isSMlayout = useMediaQuery("(max-width: 1023px)");
  const isXSlayout = useMediaQuery("(max-width: 767px)");

  return (
    <section className={styles.productSection}>
      <Typography className={styles.title} variant="h2" as="h2">
        {title}
      </Typography>
      <Swiper
        className={styles.swiperContainer}
        onSwiper={onSwiper}
        slidesPerView={"auto"}
        spaceBetween={isXSlayout ? 10 : 16}
      >
        {cards?.map((card) => (
          <SwiperSlide className={styles.swiperSlide} key={card.id}>
            <ProductCard card={card} bgColor={bgColor} size={isSMlayout ? "xs" : "xl"} />
          </SwiperSlide>
        ))}
      </Swiper>
      {!isXSlayout && (
        <div className={styles.buttonsWrapper}>
          <ButtonSlide icon="arrowLeft" theme="dark" onClick={handlePrevClick} />
          <ButtonSlide icon="arrowRight" theme="dark" onClick={handleNextClick} />
        </div>
      )}
    </section>
  );
}
