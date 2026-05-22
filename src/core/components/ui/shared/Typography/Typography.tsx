//libs
import React, { AnchorHTMLAttributes, ElementType, HTMLAttributes } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "text1"
  | "text2"
  | "text3"
  | "text4"
  | "numbers"
  | "tooltip"
  | "tooltip2"
  | "custom";

type TypographCommonProps = {
  variant: Variant;
  children: React.ReactNode;
};

type TAsAnchor = TypographCommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };
type TAsElement = TypographCommonProps & HTMLAttributes<HTMLElement> & { as: ElementType };

type TypographyProps = TAsAnchor | TAsElement;

const Typography = ({ variant, as = "p", className, children, ...props }: TypographyProps) => {
  const Component = as;

  return (
    <Component className={clsx(styles[variant], className)} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
