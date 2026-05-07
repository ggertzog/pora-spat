import React, { FC, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface IButtonRadio extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  id: string;
}

const ButtonRadio: FC<IButtonRadio> = ({ text, className, id, ...props }) => {
  return (
    <label htmlFor={id} className={styles.label}>
      <input id={id} type="radio" className={clsx(styles.input, className)} {...props} />
      <span className={styles.circle}></span>
      <span className={styles.span}>{text}</span>
    </label>
  );
};

export default ButtonRadio;