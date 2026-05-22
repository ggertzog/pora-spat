//libs
import React from "react";

//styles
import styles from "./styles.module.scss";

//components
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";

const DEFAULT_TABS = ["Доставка", "Характеристики", "Описание"];

interface IUiTabs {
  tabs?: string[];
}

const UiTabs = ({ tabs = DEFAULT_TABS }: IUiTabs) => {
  return (
    <div className={styles.tabs}>{tabs && tabs.map((tab) => <ButtonRounded key={tab} text={tab} size="h43" />)}</div>
  );
};

export default UiTabs;
