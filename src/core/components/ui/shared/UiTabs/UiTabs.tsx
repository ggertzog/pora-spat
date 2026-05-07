import React, { FC } from "react";
import styles from "./styles.module.scss";
import ButtonRounded from "../ButtonRounded/ButtonRounded";

const DEFAULT_TABS = ["Доставка", "Характеристики", "Описание"];

interface IUiTabs {
  tabs?: string[];
}

const UiTabs: FC<IUiTabs> = ({ tabs = DEFAULT_TABS }) => {
  return <div className={styles.tabs}>{tabs && tabs.map((tab) => <ButtonRounded key={tab} text={tab} size="h43" />)}</div>;
};

export default UiTabs;