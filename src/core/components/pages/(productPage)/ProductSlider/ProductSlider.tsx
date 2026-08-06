//libs
import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import SwiperCore from "swiper";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import clsx from "clsx";

//styles
import "swiper/css";
import styles from "./styles.module.scss";
import { Thumbs } from "swiper/modules";
import ButtonSlide from "../../../ui/shared/ButtonSlide/ButtonSlide";

type ProductSliderProps = {
  slides?: string[];
};

const ProductSlider = ({ slides }: ProductSliderProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [thumbnailsSwiper, setThumbnailsSwiper] = useState<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onSwiper = useCallback((swiper: SwiperClass) => {
    swiperRef.current = swiper;
  }, []);

  const handleNextClick = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const handlePrevClick = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const onSlideChange = useCallback((swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  const extendedArr = Array(9).fill(slides?.[0]);

  return (
    <div className={styles.productSlider}>
      <div className={styles.thumbnailsSwiperContainer}>
        <Swiper
          className={styles.thumbnailsSwiper}
          onSwiper={setThumbnailsSwiper}
          direction="vertical"
          spaceBetween={8}
          watchSlidesProgress={true}
          slidesPerView={"auto"}
        >
          {extendedArr &&
            extendedArr.map((item, index) => (
              <SwiperSlide key={index} className={styles.thumbnailSlide}>
                <div className={clsx(styles.thumbnailCard, activeIndex === index && styles.thumbnailCard_active)}>
                  <div className={styles.thumbnailImgWrap}>
                    <Image className={styles.thumbnailImage} src={item} alt="image" fill />
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className={styles.productSwiperContainer}>
        <Swiper
          className={styles.productSwiper}
          onSwiper={onSwiper}
          onSlideChange={onSlideChange}
          initialSlide={0}
          slidesPerView={"auto"}
          spaceBetween={10}
          modules={[Thumbs]}
          thumbs={{ swiper: thumbnailsSwiper }}
        >
          {extendedArr &&
            extendedArr.map((item, index) => (
              <SwiperSlide key={index} className={styles.productSlide}>
                <div className={styles.productCard}>
                  <div className={styles.productImgWrap}>
                    <Image
                      className={styles.productImage}
                      src={item}
                      alt="image"
                      fill
                      sizes="(min-width: 1920px) 49.32vw, (min-width: 1440px) 51.38vw"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className={styles.btnsWrap}>
          <ButtonSlide icon="arrowLeft" theme="light" onClick={handlePrevClick} />
          <ButtonSlide icon="arrowRight" theme="light" onClick={handleNextClick} />
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
