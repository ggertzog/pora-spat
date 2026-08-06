//libs
import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";


interface IButtonIcon extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  children: React.ReactNode
}

const ButtonIcon = ({ children, isActive = false, className, ...props }: IButtonIcon) => {
  return (
    <button className={clsx(styles.buttonIcon, className)} {...props}>
      {children}
      {/* TODO: Переделать логику иконки сердца, вынести ее из ui кнопки */}
      {/* <Heart className={styles.icon} isActive={isActive} /> */}
    </button>
  );
};

export default ButtonIcon;
