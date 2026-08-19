//libs
import React from "react";
import clsx from "clsx";
import Image from "next/image";

//styles
import css from "./styles.module.scss";

interface ImageBlockProps {
  className?: string;
  src: string;
  alt: string;
}

export const ImageBlock = ({ className, src, alt }: ImageBlockProps) => {
  return (
    <div className={clsx(css.imageBlock, className)}>
      <Image className={css.image} src={src} alt={alt} fill />
    </div>
  );
};
