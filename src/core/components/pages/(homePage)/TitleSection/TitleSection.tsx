//libs
import React from "react";

//styles
import styles from "./styles.module.scss";

//icons
import TitleSectionBackground from "@p/assets/images/homePage/title-section-back.svg";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

export const TitleSection = () => {
  return (
    <section className={styles.titleSection}>
      <div className={styles.titleContainer}>
        <Typography className={styles.title} variant="h2" as="h1">
          Интернет-магазин мебели для&nbsp;уютного дома
        </Typography>
        <Typography className={styles.description} variant="text1" as="p">
          &#171;Пора спать&#187;&#160;&#8212; ваш идеальный выбор! Мы&#160;предлагаем широкий ассортимент кроватей,
          матрацев, шкафов, комодов и&#160;другой мебели для создания уютной и&#160;комфортной спальни.
        </Typography>

        <TitleSectionBackground className={styles.titleSectionBackground} />
      </div>
    </section>
  );
};
