//libs
import React from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

//styles
import styles from "./styles.module.scss";
import "swiper/css";

//components
import HeroCard from "../HeroCard/HeroCard";

//types
import { ISlide } from "@/core/api/queryFetchers/getMainSliderQuery";

interface SliderProps {
  slides: ISlide[];
  onSwiper: (swiper: SwiperClass) => void;
  onSlideChange: (swiper: SwiperClass) => void;
  isXSLayout: boolean;
}

export const Slider = ({ slides, onSwiper, onSlideChange, isXSLayout }: SliderProps) => {
  return (
    <Swiper
      slidesPerView={isXSLayout ? "auto" : 1}
      spaceBetween={isXSLayout ? 8 : 0}
      className={styles.swiperContainer}
      centeredSlides={true}
      loop={true}
      speed={1000}
      onSwiper={onSwiper}
      onSlideChange={onSlideChange}
    >
      {slides?.map((slide) => (
        <SwiperSlide key={slide.id} className={styles.swiperSlide}>
          <HeroCard slide={slide} isXSLayout={isXSLayout} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
