"use client";
import styles from "./styles.module.scss";
import React, { useState } from "react";
import ContentBlock from "./ContentBlock/ContentBlock";
import ImageBlock from "./ImageBlock/ImageBlock";
import ButtonRounded from "../../ui/shared/ButtonRounded/ButtonRounded";
import clsx from "clsx";

interface AboutSectionProps {
  htmlData?: string | null;
  image?: string | null;
}

const AboutSection = ({ htmlData, image }: AboutSectionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // TODO: Изменить расширение секции
  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section className={`${styles.aboutSection} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.container}>
        <ContentBlock htmlData={htmlData} />
        <ImageBlock image={image || ""} />
      </div>
      <div className={clsx(styles.gradient, isExpanded && styles.hidden)}></div>
      <ButtonRounded
        className={styles.button}
        text={isExpanded ? "Свернуть" : "Читать далее"}
        size="h56"
        onClick={handleToggle}
      />
    </section>
  );
};

export default AboutSection;
