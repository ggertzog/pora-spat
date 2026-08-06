//libs
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//assets
import ArrowBottom from "@p/assets/icons/chevron-20.svg";

//types
import { IProductDetailed } from "@/core/types/newapi";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

interface SizePickerProps {
  variants: IProductDetailed["variants"];
  className?: string;
}

export const SizePicker = ({ variants, className }: SizePickerProps) => {
  const activeVariant = variants?.find((item) => item.is_active);
  const activeVariantIndex = variants?.findIndex((item) => item.is_active);
  const activeVariantColor = activeVariant?.list_params?.find((p) => p.title === "Цвет")?.value || null;
  const variantsWithSameColor = activeVariantColor
    ? variants?.filter((v) => v.list_params?.find((p) => p.value === activeVariantColor))
    : variants;
  const listRef = useRef<HTMLUListElement>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const expandHandler = () => {
    if (!variantsWithSameColor || variantsWithSameColor.length < 2) return;
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const section = listRef.current;
    if (!section) return;
    if (isExpanded) {
      section.style.height = `${section.scrollHeight}px`;
    } else {
      section.style.height = `0px`;
    }
  }, [isExpanded]);

  return (
    <div className={clsx(styles.sizePicker, className)}>
      <div className={clsx(styles.header, isExpanded && styles.mb)} onClick={expandHandler}>
        <div className={styles.content}>
          {activeVariant?.group_params?.slice(0, 3).map((item, index) => (
            <div key={`${item.title}-${index}`} className={styles.contentItem}>
              <Typography as="p" variant="tooltip2" className={styles.headerTitle}>
                {item.title}
              </Typography>
              <Typography as="p" variant="text4">
                {item.value} {item.measure ? ` ${item.measure}` : ""}
              </Typography>
            </div>
          ))}
        </div>
        <ArrowBottom className={clsx(styles.arrowImg, isExpanded && styles.arrowImgRotated)} />
      </div>
      <ul className={styles.list} style={{ height: "0" }} ref={listRef}>
        {variantsWithSameColor?.map((item, index) => (
          <li key={item.id} className={clsx(styles.listItem, activeVariantIndex === index && styles.listItemActive)}>
            <Link href={`/product/${item.article}`} className={styles.link}>
              <div className={styles.listContent}>
                {item.group_params?.slice(0, 3).map((item, index) => (
                  <div className={styles.listContentWrap} key={`${item.title}-${index}`}>
                    <Typography key={`${item.title}-${index}`} as="p" variant="text4">
                      {item.value} {item.measure ? ` ${item.measure}` : ""}
                    </Typography>
                  </div>
                ))}
                <div className={styles.listContentWrap}>
                  {!!item?.cost?.price && (
                    <Typography
                      as="p"
                      variant="text4"
                      className="listContentCost"
                    >{`${item.cost.price.toLocaleString() + "₽"}`}</Typography>
                  )}
                  {!item?.cost?.price && <div className="listContentCost"></div>}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
