//libs
import React from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//assets
import { CheckMark } from "@p/assets/icons/CheckMark";

type TType = "availability" | "discount";

interface IProductTag {
  icon: boolean;
  text: string;
  type: TType;
}

const ProductTag = ({ icon, text, type }: IProductTag) => {
  return (
    <div className={clsx(styles.productLink, styles[`productLink_type_${type}`])}>
      {icon && <CheckMark />}
      <span className={styles.text}>{`${text}`}</span>
    </div>
  );
};

export default ProductTag;
