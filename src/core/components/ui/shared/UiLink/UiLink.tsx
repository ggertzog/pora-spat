//libs
import React, { LinkHTMLAttributes } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

interface IUiLink extends LinkHTMLAttributes<HTMLAnchorElement> {
  text: string;
  target?: boolean;
}

const UiLink = ({ text, className, href, target, ...props }: IUiLink) => {
  return (
    <a className={clsx(styles.link, className)} href={href} target={target ? "_blank" : undefined} {...props}>
      {text}
    </a>
  );
};

export default UiLink;
