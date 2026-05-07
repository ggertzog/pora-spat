import React from "react";
import styles from "./styles.module.scss";
import TitleSectionBackground from "@p/assets/images/homePage/title-section-back.svg";

export const TitleSection = () => {
  return (
    <section className={styles.titleSection}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Интернет-магазин мебели для&nbsp;уютного дома</h1>
        <p className={styles.description}>
          &#171;Пора спать&#187;&#160;&#8212; ваш идеальный выбор! Мы&#160;предлагаем широкий ассортимент кроватей,
          матрацев, шкафов, комодов и&#160;другой мебели для создания уютной и&#160;комфортной спальни.
        </p>

        <TitleSectionBackground className={styles.titleSectionBackground} />
      </div>
    </section>
  );
};
