//libs
import React, { LinkHTMLAttributes } from "react";
import Image from "next/image";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//assets
import StarIcon from "@p/assets/icons/star-20.svg";

//types
import { IMarketplaces } from "@/core/api/queryFetchers/getMarketplacesQuery";

interface IRatingButton extends LinkHTMLAttributes<HTMLAnchorElement> {
  target?: boolean;
  item: IMarketplaces;
}

const RatingButton = ({ item, target, className, ...props }: IRatingButton) => {
  const { name, rating, slug, icon } = item;

  return (
    <a className={clsx(styles.button, className)} href={slug} target={target ? "_blank" : undefined} {...props}>
      <Image className={styles.image} src={icon || ""} alt={name || ""} width={100} height={100} />
      <div className={styles.container}>
        <span className={styles.rating}>Рейтинг: {rating}</span>
        <ul className={styles.list}>
          {/* TODO: можно попробовать сделать условие чтобы делать звездочки наполовину закрашенными */}
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

export default RatingButton;
