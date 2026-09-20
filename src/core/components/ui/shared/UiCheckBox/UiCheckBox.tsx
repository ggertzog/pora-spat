//libs
import React, { useId, forwardRef } from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//assets
import ArrowIcon from "@p/assets/icons/check-16.svg";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

type TVariant = "square" | "circle";
type TColor = "vanilla" | "blue";
type TType = "checkbox" | "radio";

interface IUiCheckBox extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  variant: TVariant;
  color?: TColor;
  type: TType;
}

const UiCheckBox = forwardRef<HTMLInputElement, IUiCheckBox>(({ type, text, variant, color, className, ...props }, ref) => {
  const id = useId();

  return (
    <div className={clsx(css.uiCheckBox, className)}>
      <input id={id} type={type} className={css.input} ref={ref} {...props} />
      <label className={clsx(css.label, css[`label_type_${variant}`], css[`label_color_${color}`])} htmlFor={id}>
        {variant === "square" && <ArrowIcon className={css.icon} />}
      </label>
      {text && (
        <Typography as="span" variant="tooltip2" className={css.text}>
          {text}
        </Typography>
      )}
    </div>
  );
});

UiCheckBox.displayName = "UiCheckBox";

export default UiCheckBox;
