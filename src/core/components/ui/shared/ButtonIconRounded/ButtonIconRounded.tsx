//libs
import React, { ButtonHTMLAttributes, JSX } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//assets
import ArrowRightSvg from "@p/assets/icons/big-arrow-right.svg";

type TIcon = "arrowRight";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: Record<TIcon, (props?: any) => JSX.Element> = {
  arrowRight: (...props) => <ArrowRightSvg {...props} />,
};

interface IButtonIconRounded extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: TIcon;
}

const ButtonIconRounded = ({ icon = "arrowRight", className, ...props }: IButtonIconRounded) => {
  const Icon = icons[icon];

  return (
    <button className={clsx(styles.button, className)} {...props}>
      <Icon className={styles.icon} />
    </button>
  );
};

export default ButtonIconRounded;
