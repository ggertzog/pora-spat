"use client";
import styles from "./styles.module.scss";
import { IDiscount } from "@/core/api/queryFetchers/getDiscountQuery";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ButtonRounded from "../../ui/shared/ButtonRounded/ButtonRounded";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import clsx from "clsx";

interface DiscountSectionProps {
  discountData: IDiscount;
}

const minSlidesCount = 8;

const DiscountSection = ({ discountData }: DiscountSectionProps) => {
  const { title, button_link, button_text, slider_images } = discountData;
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo(() => {
    const images = slider_images ?? [];
    return images.length < 1
      ? []
      : images.length < minSlidesCount
        ? Array.from({ length: Math.ceil(minSlidesCount / images.length) }, () => images).flat()
        : images;
  }, [slider_images]);

  const onSwiper = useCallback((swiper: SwiperClass) => {
    swiperRef.current = swiper;
  }, []);

  const onSlideChange = useCallback((swiper: SwiperClass) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  return (
    <section className={styles.discountSection}>
      <div className={styles.gradient}></div>
      <div className={styles.backgroundWrap}></div>
      <div className={styles.container}>
        <div className={styles.linkWrap}>
          <h2 className={styles.title}>{title}</h2>
          <ButtonRounded as="link" size="h56" text={button_text} href={button_link || ""} />
        </div>
        <div className={styles.sliderContainer}>
          <Swiper
            onSwiper={onSwiper}
            onSlideChange={onSlideChange}
            className={styles.swiperContainer}
            slidesPerView={"auto"}
            loop={true}
            initialSlide={1}
            centeredSlides={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={1000}
            spaceBetween={60}
            allowTouchMove={false}
            preventClicks={true}
            preventClicksPropagation={true}
            slideToClickedSlide={false}
          >
            {slides.map((image, index) => {
              const isActive = index === activeIndex;
              const isAfterActive =
                index === (activeIndex + 1) % slides.length || index === (activeIndex + 2) % slides.length;

              return (
                <SwiperSlide
                  key={index}
                  className={clsx(styles.swiperSlide, {
                    [styles.activeSlide as string]: isActive,
                    [styles.afterActiveSlide as string]: !isAfterActive && !isActive,
                  })}
                >
                  <Image className={styles.image} src={image} sizes="40vw" alt="Слайд" fill />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
