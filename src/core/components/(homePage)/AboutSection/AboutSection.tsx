"use client";
//libs
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//components
import ContentBlock from "./ContentBlock/ContentBlock";
import ImageBlock from "./ImageBlock/ImageBlock";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";

interface AboutSectionProps {
  htmlData?: string | null;
  image?: string | null;
}

const AboutSection = ({ htmlData, image }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isEnoughSpace, setIsEnoughSpace] = useState(false);

  const checkOverflow = () => {
    const section = sectionRef.current;
    if (section && !isExpanded) {
      const hasOverflow = section.scrollHeight > section.clientHeight;
      setIsEnoughSpace(!hasOverflow);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [htmlData]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (isExpanded) {
      section.style.height = `${section.scrollHeight}px`;
    } else {
      section.style.height = "";
    }
  }, [isExpanded]);

  // READY: Изменить расширение секции
  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section className={`${styles.aboutSection} ${isExpanded ? styles.expanded : ""}`} ref={sectionRef}>
      <div className={styles.container}>
        <ContentBlock htmlData={htmlData} />
        <ImageBlock image={image || ""} />
      </div>
      <div className={clsx(styles.gradient, isExpanded && styles.hidden)}></div>
      <ButtonRounded
        className={styles.button}
        text={isExpanded ? "Свернуть" : "Показать полностью"}
        size="h56"
        onClick={handleToggle}
      />
    </section>
  );
};

export default AboutSection;
