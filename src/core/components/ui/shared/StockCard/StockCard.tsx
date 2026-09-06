"use client";
// libs
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

//hooks
import { useMediaQuery } from "@/core/utils/hooks/useMediaQuery";

//styles
import css from "./styles.module.scss";

//types
import { IBanner } from "@/core/types/newapi";

//components
import Tag from "@/core/components/ui/shared/Tag/Tag";
import Typography from "@/core/components/ui/shared/Typography/Typography";

interface IStockCard {
  className?: string;
  banner: IBanner;
}

const StockCard = ({ className, banner }: IStockCard) => {
  const { name, sub_name, slug, color_bg, color_text, background_image, front_image, type, tags } = banner;
  const isSmLayout = useMediaQuery("(max-width: 1023px)");

  return (
    <div className={clsx(css.stockCard, className)}>
      <Link href={slug || ""} className={css.link}></Link>
      <div className={css.bgWrapper}>
        {type && type === "1" ? (
          <>
            {background_image && (
              <div className={css.bgImageWrapper}>
                <Image className={css.img} src={background_image} alt={name || "Фоновое изображение"} fill />
              </div>
            )}
            {front_image && (
              <div className={css.frontImageWrapper}>
                <Image className={css.img} src={front_image} alt={name || "Фронтальное изображение"} fill />
              </div>
            )}
          </>
        ) : (
          <>
            {background_image && (
              <div className={css.bgImageWrapper}>
                <Image className={css.img} src={background_image} alt={name || "Фоновое изображение"} fill />
              </div>
            )}
            <div
              className={css.gradientWrapper}
              style={{
                background: color_bg,
              }}
            ></div>
          </>
        )}
      </div>
      {tags && (
        <div className={css.tagsWrap}>
          {tags.map((tag, index) => (
            <Tag key={index} text={tag.title || ""} size={isSmLayout ? "sm" : "xl"} />
          ))}
        </div>
      )}
      <div
        className={clsx(
          css.contentWrap,
          type === "1" && css.contentWrap_type_first,
          type === "2" && css.contentWrap_type_second,
        )}
      >
        <Typography as="p" variant="h3" className={css.title} style={{ color: color_text || "" }}>
          {name}
        </Typography>
        <Typography as="span" variant="text1" className={css.description} style={{ color: color_text || "" }}>
          {sub_name}
        </Typography>
      </div>
    </div>
  );
};

export default StockCard;
