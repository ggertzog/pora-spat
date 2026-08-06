//libs
import React from "react";

//styles
import styles from "./styles.module.scss";

//types
import { ISlide } from "@/core/api/queryFetchers/getMainSliderQuery";

interface PaginationProps {
  slides: ISlide[];
  activeIndex: number;
  onNext: () => void;
}

const Pagination = ({ slides, activeIndex, onNext }: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      {[...Array(slides?.length || 0)].map((_, index) => (
        <div key={index} className={styles.paginationItem}>
          {index < activeIndex && (
            <div className={styles.paginationItemFillDone} />
          )}
          {index === activeIndex && (
            <div
              className={styles.paginationItemFill}
              onAnimationEnd={onNext}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
