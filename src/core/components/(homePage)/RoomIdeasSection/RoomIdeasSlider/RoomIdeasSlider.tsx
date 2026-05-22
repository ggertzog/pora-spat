//libs
import React, { useCallback, useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { StaticImageData } from "next/image";

//styles
import styles from "./styles.module.scss";
import "swiper/css";

//components
import NavigationCard from "@/core/components/ui/shared/NavigationCard/NavigationCard";

//types
import { components } from "@/core/types/__generated__/api-schema";


type NavigationCardData = Omit<components["schemas"]["PublicationResource"], "image"> & {
  image?: string | StaticImageData;
};

interface RoomIdeasSliderProps {
  cards: NavigationCardData[];
}

const RoomIdeasSlider = ({ cards }: RoomIdeasSliderProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  // Экземпляр Swiper
  const onSwiper = useCallback((swiper: SwiperClass) => {
    swiperRef.current = swiper;
  }, []);

  return (
    <Swiper
      onSwiper={onSwiper}
      className={styles.swiperContainer}
      slidesPerView="auto"
      spaceBetween={16}
      centeredSlides={true}
      centeredSlidesBounds={true}
    >
      {cards &&
        cards.length > 0 &&
        cards.map((item) => (
          <SwiperSlide className={styles.swiperSlide} key={item.id}>
            <NavigationCard card={item} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default RoomIdeasSlider;
