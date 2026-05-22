"use client";
//libs
import React, { useLayoutEffect, useRef, useState } from "react";

//styles
import styles from "./styles.module.scss";

//components
import RatingButton from "@/core/components/ui/shared/RatingButton/RatingButton";
import ReviewCard from "./ReviewCard/ReviewCard";

//query fetchers
import { useMarketplacesQuery } from "@/core/api/queryFetchers/getMarketplacesQuery";
import { useReviewsQuery } from "@/core/api/queryFetchers/getReviewsQuery";

const maxFeedbacks = 6;

export default function ReviewsSection() {
  const { data: marketplaces } = useMarketplacesQuery();
  const { data: reviews } = useReviewsQuery();

  const fbListRef = useRef<HTMLUListElement | null>(null);
  const [itemOffset, setItemOffset] = useState(0);

  useLayoutEffect(() => {
    const updateOffset = () => {
      const list = fbListRef.current;
      if (!list) return;

      const scroll = list.scrollWidth - list.offsetWidth;

      setItemOffset(Math.floor(scroll / (maxFeedbacks - 1)));
    };

    updateOffset();

    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [reviews]);

  function getItemStyles(index: number) {
    const styles = {
      transform: `translateX(-${itemOffset * index}px)`,
      zIndex: maxFeedbacks - index,
    };

    return styles;
  }

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Отзывы</h2>
        <div className={styles.ratingWrap}>
          {marketplaces?.map((item) => (
            <RatingButton key={item.id} item={item} target />
          ))}
        </div>
        <div className={styles.reviewWrap}>
          <ul className={styles.reviewList} ref={fbListRef}>
            {reviews &&
              reviews.slice(0, 6).map((item, index) => (
                <li key={item.id} className={styles.reviewItem} style={getItemStyles(index)}>
                  <ReviewCard card={item} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
