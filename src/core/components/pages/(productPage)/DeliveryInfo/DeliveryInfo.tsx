//libs
import React from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

//query fetchers
import { useCityInfoQuery } from "@/core/api/queryFetchers/getCitiesQuery";

interface DeliveryInfoProps {
  className?: string;
}

export const DeliveryInfo = ({ className }: DeliveryInfoProps) => {
  const cityId = 1;
  const { data: cityInfo } = useCityInfoQuery(cityId);

  const formatCost = (value?: string | number): string => {
    if (value == null) return "Н/Д";

    if (typeof value === "string") {
      // Проверяем, является ли строка "чисто числовой" (число, пробелы, точка, запятая)
      const isNumericString = /^[\d\s,.]+$/.test(value);
      if (!isNumericString) {
        // Если строка содержит нечисловые символы (кроме пробелов, точки, запятой), возвращаем её как есть
        return value;
      }
      const numValue = parseFloat(value);
      return isNaN(numValue) ? value : `${numValue.toLocaleString("ru-RU")} ₽`;
    }

    // Если value — число
    return `${value.toLocaleString("ru-RU")} ₽`;
  };

  return (
    <div className={clsx(styles.deliveryInfo, className)}>
      <div className={styles.deliveryWrap}>
        <Typography as="p" variant="h6" className={styles.deliveryInfoTitle}>
          Доставка
        </Typography>
        <ul className={styles.deliveryInfoList}>
          {cityInfo?.delivery_in_city && (
            <li className={styles.deliveryInfoListItem}>
              <Typography as="p" variant="text4" className={styles.deliveryInfoName}>
                По городу
              </Typography>
              <div className={styles.deliveryInfoLine}></div>
              <Typography as="p" variant="text4" className={styles.deliveryInfoValue}>
                {formatCost(cityInfo.delivery_in_city)}
              </Typography>
            </li>
          )}
          {cityInfo?.delivery_outside_city && (
            <li className={styles.deliveryInfoListItem}>
              <Typography as="p" variant="text4" className={styles.deliveryInfoName}>
                За город
              </Typography>
              <div className={styles.deliveryInfoLine}></div>
              <Typography as="p" variant="text4" className={styles.deliveryInfoValue}>
                {formatCost(cityInfo.delivery_outside_city)}
              </Typography>
            </li>
          )}
        </ul>
      </div>
      <div className={styles.deliveryWrap}>
        <Typography as="p" variant="h6" className={styles.deliveryInfoTitle}>
          Подъем
        </Typography>
        <ul className={styles.deliveryInfoList}>
          {cityInfo?.loads_up_lifting && (
            <li className={styles.deliveryInfoListItem}>
              <Typography as="p" variant="text4" className={styles.deliveryInfoName}>
                На лифте
              </Typography>
              <div className={styles.deliveryInfoLine}></div>
              <Typography as="p" variant="text4" className={styles.deliveryInfoValue}>
                {formatCost(cityInfo.loads_up_lifting)}
              </Typography>
            </li>
          )}
          {cityInfo?.loads_up_stairs && (
            <li className={styles.deliveryInfoListItem}>
              <Typography as="p" variant="text4" className={styles.deliveryInfoName}>
                По лестнице
              </Typography>
              <div className={styles.deliveryInfoLine}></div>
              <Typography as="p" variant="text4" className={styles.deliveryInfoValue}>
                {formatCost(cityInfo.loads_up_stairs)}
              </Typography>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
