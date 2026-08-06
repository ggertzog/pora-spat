//libs
import React, {  ButtonHTMLAttributes, ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//components
import Typography from "../Typography/Typography";

type TSize = "h56" | 'h52' | "h48" | "h46" | "h44" | "h43" | "h31";
type TVariant = "main" | "red" | "tertiary" | "bordered" | "main-on" | "secondary" | "beige-main" | "tab";

type TCommon = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  text?: string;
  size?: TSize;
  variant?: TVariant;
  className?: string;
  textSize?: "big" | "small";
};

type TAsButton = TCommon & ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type TAsRouter = TCommon & Omit<LinkProps, "as"> & { as: "router" };

type TProps = TAsButton | TAsRouter;

// TODO: Исправить баг с цветом кнопки в секциях
const ButtonRounded = ({
  leftIcon,
  rightIcon,
  text,
  size = "h56",
  variant = "main",
  className,
  textSize = "big",
  as: asProp,
  ...props
}: TProps) => {
  const cn = clsx(styles.button, styles[`button_size_${size}`], styles[`button_variant_${variant}`], className);

  const content = (
    <>
      {leftIcon && <span className={clsx(styles.iconWrap, styles.iconWrap_left)}>{leftIcon}</span>}
      <Typography as="span" variant={textSize === "small" ? "text2" : "text4"}>
        {text}
      </Typography>
      {rightIcon && <span className={clsx(styles.iconWrap, styles.iconWrap_right)}>{rightIcon}</span>}
    </>
  );

  if (asProp === "router") {
    return (
      <Link className={cn} {...(props as Omit<LinkProps, "as">)} prefetch={false}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cn} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
};

export default ButtonRounded;
