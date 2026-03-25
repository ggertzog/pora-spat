import React, { FC, ButtonHTMLAttributes, JSX } from "react";
import styles from "./styles.module.scss";
import CatalogSvg from "@p/assets/icons/menu.svg";
import ArrowRightSvg from "@p/assets/icons/arrow-right.svg";
import TruckIcon from "@p/assets/icons/truck.svg";

import clsx from "clsx";

type TIcon = "catalog" | "arrowRight" | "truck";

type TSize = "h56" | "h48" | "h46" | "h44" | "h43" | 'h31';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: Record<TIcon, (props?: any) => JSX.Element> = {
  catalog: ({ ...props }) => <CatalogSvg {...props} />,
  arrowRight: ({ ...props }) => <ArrowRightSvg {...props} />,
  truck: ({ ...props }) => <TruckIcon {...props} />,
};

interface IButtonRounded extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: TIcon;
  text?: string;
  size: TSize;
}

export const ButtonRounded: FC<IButtonRounded> = ({ icon, text, size = "h56", className, ...props }) => {
  const Icon = icon ? icons[icon] : null;

  return (
    <button className={clsx(styles.button, styles[`button_size_${size}`], className)} {...props}>
      {Icon && <Icon className={styles.icon} />}
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
};
