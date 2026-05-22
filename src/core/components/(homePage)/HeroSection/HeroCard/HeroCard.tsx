//libs
import React from "react";
import Image from "next/image";

//styles
import styles from "./style.module.scss";

//components
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import Typography from "@/core/components/ui/shared/Typography/Typography";

//types
import { ISlide } from "@/core/api/queryFetchers/getMainSliderQuery";

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
            <Typography as="p" className={styles.date} variant="text1" style={{ color: text_color || "" }}>
              {pretitle}
            </Typography>
          )}

          <Typography as="p" className={styles.title} variant="h1" style={{ color: text_color || "" }}>
            {title}
          </Typography>

          <Typography as="p" className={styles.subtitle} variant="text1" style={{ color: text_color || "" }}>
            {subtitle}
          </Typography>

          {!isXSLayout && <ButtonRounded size="h46" text="Подробнее" className={styles.button} />}
        </div>
      </div>
    </div>
  );
}
