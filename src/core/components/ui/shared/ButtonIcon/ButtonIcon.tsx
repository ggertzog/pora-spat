//libs
import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//assets
import { Heart } from "@p/assets/icons/Heart";

interface IButtonIcon extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const ButtonIcon = ({ isActive = false, className, ...props }: IButtonIcon) => {
  return (
    <button className={clsx(styles.buttonIcon, className)} {...props}>
      <Heart className={styles.icon} isActive={isActive} />
    </button>
  );
};

export default ButtonIcon;
