import React, { FC, ButtonHTMLAttributes, JSX } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import ArrowRight from "@p/assets/icons/right-arrow.svg";
import ArrowLeft from "@p/assets/icons/left-arrow.svg";

// TODO: Доделать disabled состояние, на макете нихера не понятно как это должно выглядеть

type TIcon = "arrowRight" | "arrowLeft";

type TTheme = "light" | "dark";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: Record<TIcon, (props?: any) => JSX.Element> = {
  arrowRight: (...props) => <ArrowRight {...props} />,
  arrowLeft: (...props) => <ArrowLeft {...props} />,
};

interface IButtonSlide extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: TIcon;
  theme: TTheme;
}

export const ButtonSlide: FC<IButtonSlide> = ({
  icon = "arrowRight",
  theme = "light",
  className,
  onClick,
  ...props
}) => {
  const Icon = icons[icon];
  return (
    <button className={clsx(styles.button, styles[`button_theme_${theme}`], className)} onClick={onClick} {...props}>
      <Icon className={styles.icon} />
    </button>
  );
};
