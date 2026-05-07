"use client";
import React from "react";
import styles from "./styles.module.scss";
import { useTagsQuery } from "@/core/api/queryFetchers/getTagsQuery";
import TagWithImage from "../../ui/shared/TagWithImage/TagWithImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "@/core/utils/hooks/useMediaQuery";

export default function TagsSection() {
  const { data: tags } = useTagsQuery();
  const isXSLayout = useMediaQuery("(max-width: 767px)");

  return (
    <section className={styles.tagsSection}>
      <div className={styles.tagsContainer}>
        <Swiper className={styles.swiperContainer} slidesPerView="auto" spaceBetween={isXSLayout ? 6 : 16}>
          {tags?.map((tag) => (
            <SwiperSlide className={styles.swiperSlide} key={tag.id}>
              <TagWithImage key={tag.id} card={tag} size={isXSLayout ? 'xs' : 'xl'} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
