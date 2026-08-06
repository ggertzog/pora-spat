//libs
import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

interface IButtonCategory extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const ButtonCategory = ({ text, className, onClick, ...props }: IButtonCategory) => {
  return (
    <button className={clsx(styles.button, className)} onClick={onClick} {...props}>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default ButtonCategory;
