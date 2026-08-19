import { useEffect, useRef, useState } from "react";

export const useAccordion = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);
  const accordionContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    accordionContentRefs.current.forEach((el, index) => {
      if (!el) return;
      el.style.height = openAccordionIndex === index ? `${el.scrollHeight}px` : "";
    });
  }, [openAccordionIndex]);

  return {openAccordionIndex, setOpenAccordionIndex, accordionContentRefs, handleAccordionToggle}
};
