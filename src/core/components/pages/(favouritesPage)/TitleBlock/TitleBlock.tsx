//libs
import React from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//components
import SectionWrapper from "@/core/components/common/SectionWrapper/SectionWrapper";
import Typography from "@/core/components/ui/shared/Typography/Typography";

//utils
import { getPluralForm } from "@/core/utils/helpers/getPluralForm";

interface TitleBlockProps {
  title: string;
  count: number;
  className?: string;
}

const TitleBlock = ({ className, title, count }: TitleBlockProps) => {
  return (
    <SectionWrapper className={clsx(css.titleBlock, className)}>
      <div className={css.titleWrap}>
        <Typography as="h1" variant="h3" className={css.title}>
          {title}
        </Typography>
        {count > 0 && (
          <Typography as="p" variant="h6" className={css.count}>
            {`(${count} ${getPluralForm(count, ["товар", "товара", "товаров"])})`}
          </Typography>
        )}
      </div>

      <div className={css.devider}></div>
    </SectionWrapper>
  );
};

export default TitleBlock;
