import React, { FC, LinkHTMLAttributes } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import clsx from "clsx";
import StarIcon from "@p/assets/icons/star.svg";

interface IRatingButton extends LinkHTMLAttributes<HTMLAnchorElement> {
  imageSrc: string;
  imageAlt: string;
  rating: number;
  href: string;
  target?: boolean;
}

export const RatingButton: FC<IRatingButton> = ({ imageSrc, imageAlt, rating, href, target, className, ...props }) => {
  return (
    <a className={clsx(styles.button, className)} href={href} target={target ? "_blank" : undefined} {...props}>
      <Image className={styles.image} src={imageSrc} alt={imageAlt} width={100} height={100} />
      <div className={styles.container}>
        <span className={styles.rating}>Рейтинг: {rating}</span>
        <ul className={styles.list}>
          {[...Array(5)].map((_, i) => (
            <li key={i} className={styles.item}>
              <StarIcon className={styles.starIcon} />
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
};
