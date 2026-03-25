import React, { FC } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { CheckMark } from "@p/assets/icons/CheckMark";

type TType = "availability" | "discount";

interface IProductTag {
  icon: boolean;
  text: string;
  type: TType;
}

export const ProductTag: FC<IProductTag> = ({ icon, text, type }) => {
  return (
    <div className={clsx(styles.productLink, styles[`productLink_type_${type}`])}>
      {icon && <CheckMark />}
      <span className={styles.text}>{text}</span>
    </div>
  );
};
