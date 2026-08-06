//libs
import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

interface IButtonIconRounded extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ButtonIconRounded = ({ children, className, ...props }: IButtonIconRounded) => {
  return <button className={clsx(styles.button, className)} {...props}>{children}</button>;
};

export default ButtonIconRounded;
