//libs
import React from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

//assets
import AddIcon from "@p/assets/icons/add.svg";

interface AccordionItemProps {
  title?: string;
  content?: string;
  isOpen: boolean;
  onToggle: () => void;
  contentRef?: (el: HTMLDivElement | null) => void;
}

export const AccordionItem = ({ title, content, isOpen, onToggle, contentRef }: AccordionItemProps) => {
  return (
    <div className={css.accordionItem} onClick={onToggle}>
      <div className={css.accordionHeader}>
        <Typography as="h4" variant="h4" className={css.accordionTitle}>
          {title}
        </Typography>
        <div className={clsx(css.close, isOpen && css.rotate)}>
          <AddIcon />
        </div>
      </div>
      <div
        ref={contentRef}
        className={clsx(css.accordionContent, isOpen && css.open)}
        dangerouslySetInnerHTML={{ __html: content || "" }}
      ></div>
    </div>
  );
};
