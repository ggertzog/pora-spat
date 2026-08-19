//libs
import React from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";
import Typography from "@/core/components/ui/shared/Typography/Typography";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";

interface ContentBlockProps {
  className?: string;
  title?: string;
  htmlData?: string | null;
  date?: string;
  href: string;
}

export const ContentBlock = ({ className, title, htmlData, date, href }: ContentBlockProps) => {
  return (
    <div className={clsx(css.contentBlock, className)}>
      <div className={css.titleWrap}>
        <Typography as="span" variant="tooltip">
          {date}
        </Typography>
        <Typography as="h1" variant="h1">
          {title}
        </Typography>
      </div>
      {htmlData && <div className={css.container} dangerouslySetInnerHTML={{ __html: htmlData }}></div>}
      <ButtonRounded as="router" href="#" variant="beige-main" size="h56" text="Смотреть" className={css.link} />
    </div>
  );
};
