//libs
import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

interface IButtonAddToBasket extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const ButtonAddToBasket = ({ text, icon, className, onClick, ...props }: IButtonAddToBasket) => {
  return (
    <button className={clsx(styles.button, className)} onClick={onClick} {...props}>
      {text && <span className={styles.text}>{text}</span>}
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};

export default ButtonAddToBasket;
