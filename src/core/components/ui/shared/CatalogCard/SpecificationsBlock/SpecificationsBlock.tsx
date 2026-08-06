//libs
import React from "react";
import clsx from "clsx";

//css
import css from "./styles.module.scss";
import Typography from "@/core/components/ui/shared/Typography/Typography";

interface SpecificationsBlockProps {
  className?: string;
  params: {
    title?: string;
    value?: string;
    measure?: string | null;
    type?: string;
  }[];
}

export const SpecificationsBlock = ({ params, className }: SpecificationsBlockProps) => {
  if (!params) return null;

  const dimensionsParams = params.filter((param) => param.type === "string");
  const specificationsParams = params.filter((param) => param.type !== "string");

  return (
    <div className={clsx(css.specifications, className)}>
      <ul className={css.specificationsList}>
        {specificationsParams &&
          specificationsParams.length > 0 &&
          specificationsParams.map((param, index) => (
            <li className={css.specificationsItem} key={index}>
              <Typography as="p" variant="tooltip2" className={css.specificationsItemTitle}>
                {param.title?.[0]?.toLocaleUpperCase()}
              </Typography>
              <Typography as="span" variant="text4" className={css.specificationsItemValue}>
                {param.value}
              </Typography>
            </li>
          ))}
      </ul>
      {dimensionsParams &&
        dimensionsParams.length > 0 &&
        dimensionsParams.map((item, index) => (
          <div className={css.dimensions} key={index * 123}>
            <Typography as="p" variant="tooltip2" className={css.specificationsItemTitle}>
              {item.title}
            </Typography>
            <Typography as="span" variant="text4" className={css.specificationsItemTitle}>
              {item.value}
            </Typography>
          </div>
        ))}
    </div>
  );
};
