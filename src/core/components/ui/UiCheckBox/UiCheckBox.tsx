import React, { FC, JSX } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import Arrow from "@p/assets/icons/checkbox-arrow.svg";

type TIcon = "arrow";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: Record<TIcon, (props?: any) => JSX.Element> = {
  arrow: (props) => <Arrow {...props} />,
};

type TType = "square" | "circle";
type TColor = "vanilla" | 'blue';

interface IUiCheckBox {
  text: string;
  type: TType;
  color?: TColor;
}

export const UiCheckBox: FC<IUiCheckBox> = ({ text, type, color }) => {
  const Icon = icons["arrow"];

  return (
    <div className={styles.uiCheckBox}>
      <input id={text} type="checkbox" className={styles.input} />
      <label className={clsx(styles.label, styles[`label_type_${type}`], styles[`label_color_${color}`])} htmlFor={text}>
        <Icon className={styles.icon} />
      </label>
      <span className={styles.text}>{text}</span>
    </div>
  );
};
