//libs
import React from "react";
import clsx from "clsx";
import Link from "next/link";

//styles
import styles from "./styles.module.scss";

interface ITag {
  text?: string;
  size: "xl" | "sm";
  slug?: string;
  background_color?: string;
  className?: string;
}

const Tag = ({ text, size, slug, background_color, className }: ITag) => {
  return (
    <Link
      href={slug || "#"}
      className={clsx(styles.tag, styles[`tag_size_${size}`], className)}
      style={{ backgroundColor: background_color }}
    >
      <span className={styles.text}>{text}</span>
    </Link>
  );
};

export default Tag;
