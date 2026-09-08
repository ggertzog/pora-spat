//libs
import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

interface IButtonIcon extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  children: React.ReactNode;
}

const ButtonIcon = ({ children, isActive = false, className, ...props }: IButtonIcon) => {
  return (
    <button className={clsx(css.buttonIcon, isActive && css["buttonIcon_active"], className)} {...props}>
      {children}
    </button>
  );
};

export default ButtonIcon;
