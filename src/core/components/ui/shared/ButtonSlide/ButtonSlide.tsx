//libs
import React, { ButtonHTMLAttributes, JSX } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//assets
import ArrowRight from "@p/assets/icons/right-arrow.svg";
import ArrowLeft from "@p/assets/icons/left-arrow.svg";

// TODO: Доделать disabled состояние, на макете не понятно как это должно выглядеть

type TIcon = "arrowRight" | "arrowLeft";

type TTheme = "light" | "dark";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: Record<TIcon, (props?: any) => JSX.Element> = {
  arrowRight: (props) => <ArrowRight {...props} />,
  arrowLeft: (props) => <ArrowLeft {...props} />,
};

interface IButtonSlide extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: TIcon;
  theme: TTheme;
}

const ButtonSlide = ({ icon = "arrowRight", theme = "light", className, onClick, ...props }: IButtonSlide) => {
  const Icon = icons[icon];
  return (
    <button className={clsx(styles.button, styles[`button_theme_${theme}`], className)} onClick={onClick} {...props}>
      <Icon className={styles.icon} />
    </button>
  );
};

export default ButtonSlide;
