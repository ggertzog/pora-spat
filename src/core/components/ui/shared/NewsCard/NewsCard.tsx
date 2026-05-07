import Image, { StaticImageData } from "next/image";
import styles from "./styles.module.scss";
import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface INewsCard {
  link: string;
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  date: string;
  size: "xl" | "xs";
}

const NewsCard = ({ link, image, title, subtitle, date, size }: INewsCard) => {
  return (
    <Link className={clsx(styles.newsCard, styles[`newsCard_size_${size}`])} href={link}>
      <div className={styles.imageWrap}>
        <Image className={styles.img} src={image} alt={title} fill />
      </div>
      <div className={styles.contentWrap}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.date}>{date}</p>
      </div>
    </Link>
  );
};

export default NewsCard;
