//libs
import React from "react";

//styles
import styles from "./styles.module.scss";

//types
import { IProductDetailed } from "@/core/types/newapi";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";
import ColorLink from "@/core/components/ui/shared/ColorLink/ColorLink";

interface ColorPickerProps {
  variants: IProductDetailed["variants"];
}

export const ColorPicker = ({ variants }: ColorPickerProps) => {
  // Извлекаю первый элемент
  const getFirstParam = (v: NonNullable<IProductDetailed["variants"]>[number]) => v?.list_params?.[0]?.value;

  // Убираю дубликаты и возвращаю активный вариант, если его нет то значение текущего
  const colors = [
    ...new Set(
      variants?.map((v) => {
        const activeVariant = variants.find(
          (activeVariant) => getFirstParam(activeVariant) === getFirstParam(v) && activeVariant.is_active,
        );
        return getFirstParam(activeVariant ?? v);
      }),
    ),
  ].sort();

  return (
    <div className={styles.colorPicker}>
      <Typography as="p" variant="text4">
        Цвет
      </Typography>
      <ul className={styles.colorsList}>
        {colors.map((colorValue, index) => {
          const variant =
            variants?.find((v) => v?.list_params?.[0]?.value === colorValue && v.is_active) ||
            variants?.find((v) => v?.list_params?.[0]?.value === colorValue);
          return (
            <li key={`${variant?.article}-${variant?.list_params?.[0]?.value}`}>
              {variant?.list_params?.[0]?.preview && (
                <ColorLink
                  href={variant?.article || "#"}
                  img={variant?.list_params?.[0]?.preview}
                  imgAlt={variant?.list_params?.[0]?.title || "Цвет"}
                  isActive={variant?.is_active ? true : false}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
