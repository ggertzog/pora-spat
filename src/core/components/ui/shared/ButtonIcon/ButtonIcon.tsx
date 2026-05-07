import React, { ButtonHTMLAttributes, FC } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { Heart } from "@p/assets/icons/Heart";

interface IButtonIcon extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const ButtonIcon: FC<IButtonIcon> = ({ isActive = false, className, ...props }) => {
  return (
    <button className={clsx(styles.buttonIcon, className)} {...props}>
      <Heart className={styles.icon} isActive={isActive} />
    </button>
  );
};

export default ButtonIcon;