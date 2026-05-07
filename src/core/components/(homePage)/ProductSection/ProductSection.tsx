"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { IHitSale } from "@/core/api/queryFetchers/getHitSalesQuery";
import ProductCard from "@/core/components/ui/shared/ProductCard/ProductCard";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import ButtonSlide from "../../ui/shared/ButtonSlide/ButtonSlide";

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

  return (
    <section className={styles.productSection}>
      <h2 className={styles.title}>{title}</h2>
      <Swiper className={styles.swiperContainer} onSwiper={onSwiper} slidesPerView={"auto"} spaceBetween={10}>
        {cards?.map((card) => (
          <SwiperSlide className={styles.swiperSlide} key={card.id}>
            <ProductCard card={card} bgColor={bgColor} size="xl" />
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
