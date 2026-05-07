import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Tag from "@/core/components/ui/shared/Tag/Tag";
import clsx from "clsx";
import { IBanner } from "@/core/api/queryFetchers/getBannersQuery";

// interface IStockCard {
//     background_image: string | StaticImageData;
//     front_image?: string | StaticImageData;
//     title: string;
//     description: string;
//     type: number;
//     color_bg?: string;
//     tags: string[];
// }

interface IStockCard {
  banner: IBanner;
}

const StockCard = ({ banner }: IStockCard) => {
  const { name, sub_name, slug, color_bg, color_text, background_image, front_image, type, tags } = banner;

  return (
    <div className={styles.stockCard}>
      <div className={styles.bgWrapper}>
        {type && type === "1" ? (
          <>
            {background_image && (
              <div className={styles.bgImageWrapper}>
                <Image className={styles.img} src={background_image} alt={name || "Фоновое изображение"} fill />
              </div>
            )}
            {front_image && (
              <div className={styles.frontImageWrapper}>
                <Image className={styles.img} src={front_image} alt={name || "Фронтальное изображение"} fill />
              </div>
            )}
          </>
        ) : (
          <>
            {background_image && (
              <div className={styles.bgImageWrapper}>
                <Image className={styles.img} src={background_image} alt={name || "Фоновое изображение"} fill />
              </div>
            )}
            <div
              className={styles.gradientWrapper}
              style={{
                background: color_bg,
              }}
            ></div>
          </>
        )}
      </div>
      <div className={styles.tagsWrap}>
        {tags && tags.map((tag, index) => <Tag key={index} text={tag.title || ""} size="sm" />)}
      </div>
      <div
        className={clsx(
          styles.contentWrap,
          type === "1" && styles.contentWrap_type_first,
          type === "2" && styles.contentWrap_type_second,
        )}
      >
        <p className={styles.title} style={{ color: color_text || "" }}>
          {name}
        </p>
        <span className={styles.description} style={{ color: color_text || "" }}>
          {sub_name}
        </span>
      </div>
    </div>
  );
};

export default StockCard;
