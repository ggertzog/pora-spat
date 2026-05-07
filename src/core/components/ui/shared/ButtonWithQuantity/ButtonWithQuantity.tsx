import React, { FC, ButtonHTMLAttributes, JSX } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import FavoriteSvg from "@p/assets/icons/heart-icon.svg";
import BasketSvg from "@p/assets/icons/basket.svg";
import HomeSvg from "@p/assets/icons/home.svg";

type TIcon = "favorite" | "basket" | "home";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: Record<TIcon, (props?: any) => JSX.Element> = {
  favorite: ({ ...props }) => <FavoriteSvg {...props} />,
  basket: ({ ...props }) => <BasketSvg {...props} />,
  home: ({ ...props }) => <HomeSvg {...props} />,
};

interface IButtonWithQuantity extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: TIcon;
  quantity: number;
  text?: string;
  size?: 'xl' | 'xs';
}

const ButtonWithQuantity: FC<IButtonWithQuantity> = ({ icon, quantity, text, size = 'xl', className, ...props }) => {
  const Icon = icons[icon];

  return (
    <button className={clsx(styles.button, styles[`button_size_${size}`], className)} {...props}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
        {quantity > 0 && <span className={styles.quantity}>{quantity}</span>}
      </div>
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
};

export default ButtonWithQuantity;