import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { IReview } from "@/core/api/queryFetchers/getReviewsQuery";

interface ReviewCardProps {
  card: IReview;
}

const ReviewCard = ({ card }: ReviewCardProps) => {
  return (
    <div className={styles.reviewCard}>
      <Image className={styles.reviewImage} src={card.image || ""} alt="review" fill />
    </div>
  );
};

export default ReviewCard;
