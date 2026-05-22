//libs
import React, { JSX } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//assets
import Arrow from "@p/assets/icons/checkbox-arrow.svg";

type TIcon = "arrow";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: Record<TIcon, (props?: any) => JSX.Element> = {
  arrow: (props) => <Arrow {...props} />,
};

type TType = "square" | "circle";
type TColor = "vanilla" | "blue";

interface IUiCheckBox {
  text: string;
  type: TType;
  color?: TColor;
}

const UiCheckBox = ({ text, type, color }: IUiCheckBox) => {
  const Icon = icons["arrow"];

  return (
    <div className={styles.uiCheckBox}>
      <input id={text} type="checkbox" className={styles.input} />
      <label
        className={clsx(styles.label, styles[`label_type_${type}`], styles[`label_color_${color}`])}
        htmlFor={text}
      >
        <Icon className={styles.icon} />
      </label>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default UiCheckBox;
