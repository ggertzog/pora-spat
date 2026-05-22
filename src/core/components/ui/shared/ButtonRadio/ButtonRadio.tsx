//libs
import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

interface IButtonRadio extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  id: string;
}

const ButtonRadio = ({ text, className, id, ...props }: IButtonRadio) => {
  return (
    <label htmlFor={id} className={styles.label}>
      <input id={id} type="radio" className={clsx(styles.input, className)} {...props} />
      <span className={styles.circle}></span>
      <span className={styles.span}>{text}</span>
    </label>
  );
};

export default ButtonRadio;
