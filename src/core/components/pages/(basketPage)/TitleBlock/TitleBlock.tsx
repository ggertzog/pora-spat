//libs
import React from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//helpers
import { getPluralForm } from "@/core/utils/helpers/getPluralForm";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

interface TitleBlockProps {
  className?: string;
  count: number;
}

export const TitleBlock = ({ className, count }: TitleBlockProps) => {
  return (
    <div className={clsx(css.titleBlock, className)}>
      <Typography className={css.title} as="h1" variant="h1">
        Корзина {count <= 0 ? "пуста" : null}
      </Typography>
      {count > 0 && (
        <Typography className={css.productCount} as="span" variant="h6">
          {`(${count} ${getPluralForm(count, ["товар", "товара", "товаров"])})`}
        </Typography>
      )}
    </div>
  );
};
