//libs
import React from "react";

//styles
import css from "./styles.module.scss";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";
import clsx from "clsx";

interface TitleBlockProps {
    className?: string;
    title: string;
    description: string;
}

export const TitleBlock = ({className, title, description}: TitleBlockProps) => {
  return (
    <div className={clsx(css.titleBlock, className)}>
      <Typography as="h1" variant="h1" className={css.title}>
        {title}
      </Typography>
      <div className={css.description} dangerouslySetInnerHTML={{ __html: description || "" }}></div>
    </div>
  );
};
