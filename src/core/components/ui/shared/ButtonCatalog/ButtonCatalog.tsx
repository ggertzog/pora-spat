//libs
import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Image from "next/image";

//styles
import css from "./styles.module.scss";

//assets
import ArrowRightIcon from "@p/assets/icons/chevron-16.svg";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

interface IButtonCatalog extends ButtonHTMLAttributes<HTMLButtonElement> {
  image?: string;
  text?: string;
  active?: boolean;
}

const ButtonCatalog = ({ image, text, active, className, ...props }: IButtonCatalog) => {
  return (
    <button className={clsx(css.button, active && css.buttonActive, className)} {...props}>
      <div className={css.container}>
        {image && <Image className={css.image} src={image} alt={text || ""} width={24} height={24} />}
        <Typography as="span" variant="text2" className={css.text}>
          {text}
        </Typography>
      </div>
      <ArrowRightIcon className={css.arrow} />
    </button>
  );
};

export default ButtonCatalog;
