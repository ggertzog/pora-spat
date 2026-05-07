import Image from "next/image";
import React from "react";
import styles from "./style.module.scss";
import { ISlide } from "@/core/api/queryFetchers/getMainSliderQuery";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import clsx from "clsx";

interface IHeroCardProps {
  slide: ISlide;
  isXSLayout: boolean;
}

export default function HeroCard({ slide, isXSLayout }: IHeroCardProps) {
  const { background_image, product_image, background_color, pretitle, title, subtitle, text_color } = slide;

  return (
    <div className={styles.heroCard}>
      <div className={styles.backgroundContainer} style={{ background: background_color || "" }}>
        {background_image && (
          <div className={styles.backBackground}>
            <Image src={background_image} alt="back-background" fill />
          </div>
        )}
        {product_image && (
          <div className={styles.frontBackground}>
            <Image src={product_image} alt="front-background" fill />
          </div>
        )}
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.contentWrap}>
          {pretitle && (
            <p className={styles.date} style={{ color: text_color || "" }}>
              {pretitle}
            </p>
          )}

          <p className={styles.title} style={{ color: text_color || "" }}>
            {title}
          </p>

          <p className={styles.subtitle} style={{ color: text_color || "" }}>
            {subtitle}
          </p>

          {!isXSLayout && <ButtonRounded size="h46" text="Подробнее" className={styles.button} />}
        </div>
      </div>
    </div>
  );
}
