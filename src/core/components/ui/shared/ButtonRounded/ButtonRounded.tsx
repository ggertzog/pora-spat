import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, JSX } from "react";
import Link, { LinkProps } from "next/link";
import styles from "./styles.module.scss";
import CatalogSvg from "@p/assets/icons/menu.svg";
import ArrowRightSvg from "@p/assets/icons/arrow-right.svg";
import TruckIcon from "@p/assets/icons/truck.svg";
import clsx from "clsx";

type TIcon = "catalog" | "arrowRight" | "truck";
type TSize = "h56" | "h48" | "h46" | "h44" | "h43" | "h31";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: Record<TIcon, (props?: any) => JSX.Element> = {
  catalog: ({ ...props }) => <CatalogSvg {...props} />,
  arrowRight: ({ ...props }) => <ArrowRightSvg {...props} />,
  truck: ({ ...props }) => <TruckIcon {...props} />,
};

type TCommon = {
  icon?: TIcon;
  text?: string;
  size: TSize;
  className?: string;
};

type TAsButton = TCommon & ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type TAsAnchor = TCommon & AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string };
type TAsLink = TCommon & Omit<LinkProps, "as"> & { as: "link" };

type TProps = TAsButton | TAsAnchor | TAsLink;

const ButtonRounded = ({ icon, text, size = "h56", className, as: asProp, ...props }: TProps) => {
  const Icon = icon ? icons[icon] : null;
  const cn = clsx(styles.button, styles[`button_size_${size}`], className);
  const children = (
    <>
      {Icon && <Icon className={styles.icon} />}
      {text}
    </>
  );

  if (asProp === "link") {
    return (
      <Link className={cn} {...(props as Omit<LinkProps, "as">)}>
        {children}
      </Link>
    );
  }

  if (asProp === "a") {
    return (
      <a className={cn} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={cn} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};

export default ButtonRounded;