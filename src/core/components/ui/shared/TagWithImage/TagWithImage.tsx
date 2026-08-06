//libs
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

//styles
import styles from "./styles.module.scss";

//types
import { ITag } from "@/core/api/queryFetchers/getTagsQuery";

interface ITagWithImage {
  card: ITag;
  size: "xl" | "xs";
}

const TagWithImage = ({ card, size }: ITagWithImage) => {
  const { title, image_url, link, background_color } = card;

  return (
    <div
      className={clsx(styles.tagWithImage, styles[`tagWithImage_size_${size}`])}
      style={{ background: background_color || "" }}
    >
      <p className={styles.text}>{title}</p>
      <div className={styles.imageWrap} style={{ background: background_color || "" }}>
        {image_url && <Image className={styles.image} src={image_url} alt="tag" fill />}
      </div>
      <Link className={styles.link} href={link || ""} />
    </div>
  );
};

export default TagWithImage;
