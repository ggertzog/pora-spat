"use client";
//libs
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//components
import ContentBlock from "./ContentBlock/ContentBlock";
import ImageBlock from "./ImageBlock/ImageBlock";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import SectionWrapper from "../SectionWrapper/SectionWrapper";

interface AboutSectionProps {
  htmlData?: string | null;
  image?: string | null;
  className?: string;
}

const AboutSection = ({ htmlData, image, className }: AboutSectionProps) => {
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

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  if (!htmlData) {
    return null;
  }

  return (
    <SectionWrapper className={clsx(css.aboutSection, isExpanded && css.expanded, className)} ref={sectionRef}>
      <div className={css.container}>
        <ContentBlock htmlData={htmlData} />
        <ImageBlock image={image || ""} />
      </div>
      {!isEnoughSpace && (
        <>
          <div className={clsx(css.gradient, isExpanded && css.hidden)}></div>
          <ButtonRounded
            className={css.button}
            text={isExpanded ? "Свернуть" : "Показать полностью"}
            size="h56"
            onClick={handleToggle}
          />
        </>
      )}
    </SectionWrapper>
  );
};

export default AboutSection;
