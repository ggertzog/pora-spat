//libs
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

interface INewsCard {
  link: string;
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  date: string;
  className?: string;
}

const NewsCard = ({ link, image, title, subtitle, date, className }: INewsCard) => {
  return (
    <Link className={clsx(styles.newsCard, className)} href={link}>
      <div className={styles.imageWrap}>
        <Image className={styles.img} src={image} alt={title} fill />
      </div>
      <div className={styles.contentWrap}>
        <Typography as="h3" variant="h4" className={styles.title}>
          {title}
        </Typography>
        <div className={styles.subtitle} dangerouslySetInnerHTML={{ __html: subtitle.replace(/<[^>]*>/g, "") }}></div>
        <Typography as="p" variant="tooltip" className={styles.date}>
          {date}
        </Typography>
      </div>
    </Link>
  );
};

export default NewsCard;
