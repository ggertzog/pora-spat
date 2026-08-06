//libs
import React, { ButtonHTMLAttributes, JSX } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

interface IButtonWithQuantity extends ButtonHTMLAttributes<HTMLButtonElement> {
  quantity: number;
  text?: string;
  size?: "xl" | "xs";
  children: React.ReactNode;
}

const ButtonWithQuantity = ({ children, quantity, text, size = "xl", className, ...props }: IButtonWithQuantity) => {
  return (
    <button className={clsx(styles.button, styles[`button_size_${size}`], className)} {...props}>
      <div className={styles.iconWrapper}>
        {children}
        {quantity > 0 && <span className={styles.quantity}>{quantity}</span>}
      </div>
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
};

export default ButtonWithQuantity;
