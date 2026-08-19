//libs
import React, { AnchorHTMLAttributes } from "react";
import clsx from "clsx";
import Link from "next/link";

//styles
import css from "./styles.module.scss";

//components
import Typography from "../Typography/Typography";

interface CategoryLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  href: string;
}

const CategoryLink = ({ text, className, href, ...props }: CategoryLinkProps) => {
  return (
    <Link className={clsx(css.link, className)} href={href} {...props}>
      <Typography as="span" variant="text4" className={css.text}>
        {text}
      </Typography>
    </Link>
  );
};

export default CategoryLink;
