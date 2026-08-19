//libs
import React, { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//components
import UiCheckBox from "@/core/components/ui/shared/UiCheckBox/UiCheckBox";

interface SortFormProps {
  className?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  activeSort?: string;
  setActiveSort: Dispatch<SetStateAction<string>>;
}

export const SortForm = ({ className, isOpen, setIsOpen, activeSort, setActiveSort }: SortFormProps) => {
  const handleSortChange = (value: string) => {
    setActiveSort(value);
    setIsOpen(false);
  };

  return (
    <form className={clsx(css.sortForm, isOpen && css.open, className)}>
      <UiCheckBox
        type="radio"
        variant="circle"
        color="vanilla"
        text="Новые"
        name="sort"
        value={"new"}
        checked={activeSort === "new"}
        onChange={() => handleSortChange("new")}
      />
      <UiCheckBox
        type="radio"
        variant="circle"
        color="vanilla"
        text="Дешевле"
        name="sort"
        value={"cheaper"}
        checked={activeSort === "cheaper"}
        onChange={() => handleSortChange("cheaper")}
      />
      <UiCheckBox
        type="radio"
        variant="circle"
        color="vanilla"
        text="Дороже"
        name="sort"
        value={"expensive"}
        checked={activeSort === "expensive"}
        onChange={() => handleSortChange("expensive")}
      />
    </form>
  );
};
