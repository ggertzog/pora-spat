import React, { FC } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import Image, { StaticImageData } from "next/image";

interface IColorLink extends LinkProps {
  img: string | StaticImageData;
  imgAlt?: string;
}

const ColorLink: FC<IColorLink> = ({ img, imgAlt = "image", href, ...props }) => {
  return (
    <Link className={clsx(styles.colorLink, styles[`colorLink_active`])} href={href} {...props}>
      <div className={styles.img}>
        <Image src={img} alt={imgAlt} fill sizes="100vw" />
      </div>
    </Link>
  );
};

export default ColorLink;