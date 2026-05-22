"use client";
//libs
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SwiperClass } from "swiper/react";

//styles
import styles from "./styles.module.scss";

//components
import ButtonSlide from "@/core/components/ui/shared/ButtonSlide/ButtonSlide";
import Pagination from "./Pagination/Pagination";
import { Slider } from "./Slider/Slider";

//query fetchers
import { useMainSliderQuery } from "@/core/api/queryFetchers/getMainSliderQuery";

//hooks
import { useMediaQuery } from "@/core/utils/hooks/useMediaQuery";

export default function HeroSection() {
  const { data: rawSlides } = useMainSliderQuery();
  const slides = rawSlides
    ? Array.from({ length: 9 }, (_, i) => ({ ...rawSlides[i % rawSlides.length], id: i + 1 }))
    : undefined;
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onSwiper = useCallback((swiper: SwiperClass) => {
    swiperRef.current = swiper;
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperClass) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleNextClick = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const handlePrevClick = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const isXSLayout = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (!isXSLayout) return;
    const timer = setTimeout(() => {
      swiperRef.current?.slideNext();
    }, 6000);
    return () => clearTimeout(timer);
  }, [activeIndex, isXSLayout]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.controlsWrapper}>
        {!isXSLayout && (
          <div className={styles.buttonsWrapper}>
            <ButtonSlide icon="arrowLeft" theme="light" onClick={handlePrevClick} />
            <ButtonSlide icon="arrowRight" theme="light" onClick={handleNextClick} />
          </div>
        )}

        {slides && !isXSLayout && <Pagination slides={slides} activeIndex={activeIndex} onNext={handleNextClick} />}
      </div>

      {slides && (
        <Slider slides={slides} onSwiper={onSwiper} onSlideChange={handleSlideChange} isXSLayout={isXSLayout} />
      )}
    </section>
  );
}
