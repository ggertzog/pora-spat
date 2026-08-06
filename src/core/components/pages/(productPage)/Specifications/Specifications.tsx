//libs
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//components
import { Parameters } from "./Parameters/Parameters";
import { Description } from "./Description/Description";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";

//types
import { IProductDetailed } from "@/core/types/newapi";

interface SpecificationsProps {
  productData: IProductDetailed;
  className?: string;
}

export const Specifications = ({ productData, className }: SpecificationsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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

  return (
    <div className={clsx(styles.specifications, className)}>
      <div className={styles.specificationsImages}>
        {productData?.blueprints?.map((item, index) => (
          <div key={index} className={styles.imageWrap}>
            <Image src={item} alt="Чертеж" width={387} height={256} />
          </div>
        ))}
      </div>
      <div className={styles.specificationsAccordion}>
        <div className={clsx(styles.specificationsAccordionContent, isExpanded && styles.expanded)} ref={sectionRef}>
          <Parameters productData={productData} />
          <Description productData={productData} />
        </div>
        <div className={clsx(styles.gradient, isExpanded && styles.hidden)}></div>
        {!isExpanded && (
          <ButtonRounded className={styles.button} text={"Показать полностью"} size="h56" onClick={handleToggle} />
        )}
      </div>
    </div>
  );
};
