//libs
import React from "react";
import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import Image, { StaticImageData } from "next/image";

//styles
import styles from "./styles.module.scss";

interface IColorLink extends LinkProps {
  img: string | StaticImageData;
  imgAlt?: string;
  isActive: boolean;
}

const ColorLink = ({ img, imgAlt = "image", isActive, href, ...props }: IColorLink) => {
  return (
    <Link className={clsx(styles.colorLink, isActive && styles[`colorLink_active`])} href={href} {...props}>
      <div className={styles.img}>
        <Image src={img} alt={imgAlt} fill sizes="100vw" />
      </div>
    </Link>
  );
};

export default ColorLink;
