import React, { ButtonHTMLAttributes, FC, JSX } from "react";
import styles from "./styles.module.scss";
import ArrowRightSvg from "@p/assets/icons/big-arrow-right.svg";
import clsx from "clsx";

type TIcon = "arrowRight";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: Record<TIcon, (props?: any) => JSX.Element> = {
  arrowRight: (...props) => <ArrowRightSvg {...props} />,
};

interface IButtonIconRounded extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: TIcon;
}

export const ButtonIconRounded: FC<IButtonIconRounded> = ({ icon = "arrowRight", className, ...props }) => {
  const Icon = icons[icon];

  return (
    <button className={clsx(styles.button, className)} {...props}>
      <Icon className={styles.icon} />
    </button>
  );
};
