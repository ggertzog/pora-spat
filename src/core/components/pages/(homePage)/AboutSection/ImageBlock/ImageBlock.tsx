//libs
import React from "react";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";

//styles
import styles from "./styles.module.scss";

interface ImageBlockProps {
  image: string | StaticImageData;
  className?: string;
}

const ImageBlock = ({ image, className }: ImageBlockProps) => {
  return (
    <div className={clsx(styles.imageBlock, className)}>
      <Image className={styles.image} src={image} alt="Изображение" fill />
    </div>
  );
};

export default ImageBlock;
