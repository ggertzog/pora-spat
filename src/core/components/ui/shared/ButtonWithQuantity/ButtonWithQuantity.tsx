//libs
import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Link, { LinkProps } from "next/link";

//styles
import css from "./styles.module.scss";

//components
import Typography from "../Typography/Typography";

type TCommon = {
  className?: string;
  quantity?: number;
  text: string;
  active: boolean;
  children: React.ReactNode;
};

type TAsButton = TCommon & ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type TAsRouter = TCommon & Omit<LinkProps, "as"> & { as?: "router" };

type ButtonWithQuantityProps = TAsButton | TAsRouter;

const ButtonWithQuantity = ({
  className,
  quantity = 0,
  text,
  active,
  children,
  as: asProp,
  ...props
}: ButtonWithQuantityProps) => {
  const cn = clsx(css.button, active && css.button_active, className);

  const content = (
    <>
      <div className={css.iconWrapper}>
        {children}
        {quantity > 0 && (
          <Typography as="span" variant="custom" className={css.quantity}>
            {quantity}
          </Typography>
        )}
      </div>
      {text && (
        <Typography as="span" variant="text4" className={css.text}>
          {text}
        </Typography>
      )}
    </>
  );

  if (asProp === "router") {
    return (
      <Link className={cn} {...(props as Omit<LinkProps, "as">)} prefetch={false}>
        {content}
      </Link>
    );
  }
  if (asProp === "button") {
    return (
      <button className={cn} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {content}
      </button>
    );
  }
};

export default ButtonWithQuantity;
