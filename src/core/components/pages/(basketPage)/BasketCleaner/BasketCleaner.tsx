//libs
import React from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//assets
import TrashIcon from "@p/assets/icons/trash.svg";

//stores
import { useDeleteSelected, useIsAllSelected, useSelectAll, useSelectedCount } from "@/core/store/useBasketStore";

//components
import UiCheckBox from "@/core/components/ui/shared/UiCheckBox/UiCheckBox";
import Typography from "@/core/components/ui/shared/Typography/Typography";

interface BasketCleanerProps {
  className?: string;
}

export const BasketCleaner = ({ className }: BasketCleanerProps) => {
  const isAllSelected = useIsAllSelected();
  const selectedCount = useSelectedCount();
  const handleSelectAll = useSelectAll();
  const handleDeleteSelected = useDeleteSelected();

  return (
    <div className={clsx(css.basketCleaner, className)}>
      <UiCheckBox
        variant="square"
        color="vanilla"
        type="checkbox"
        text="Выбрать все"
        checked={isAllSelected}
        onChange={handleSelectAll}
      />
      <button className={css.clearButton} onClick={handleDeleteSelected} disabled={selectedCount === 0}>
        <TrashIcon className={css.trashIcon} />
        <Typography className={css.clearButtonText} as="span" variant="text4">
          Очистить корзину
        </Typography>
      </button>
    </div>
  );
};
