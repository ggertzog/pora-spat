//libs
import React from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

interface ITag {
  text: string;
  size: "xl" | "sm";
}

const Tag = ({ text, size }: ITag) => {
  return (
    <div className={clsx(styles.tag, styles[`tag_size_${size}`])}>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default Tag;
