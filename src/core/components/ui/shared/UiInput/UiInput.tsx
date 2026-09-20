//libs
import React, { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//components
import ButtonIconRounded from "@/core/components/ui/shared/ButtonIconRounded/ButtonIconRounded";

//assets
import ArrowRightIcon from "@p/assets/icons/arrow-right.svg";

interface UiInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const UiInput = forwardRef<HTMLInputElement, UiInputProps>(
  ({ className, maxLength = 100, type = "text", error, onButtonClick, disabled, ...props }, ref) => {
    return (
      <div className={clsx(css.form, className)}>
        <label className={css.formLabel}>
          <input
            className={css.formInput}
            ref={ref}
            type={type}
            autoComplete="off"
            spellCheck="false"
            maxLength={maxLength}
            disabled={disabled}
            {...props}
          />
          <ButtonIconRounded
            className={css.submitButton}
            type={onButtonClick ? "button" : "submit"}
            onClick={onButtonClick}
            disabled={disabled}
          >
            <ArrowRightIcon />
          </ButtonIconRounded>
        </label>
        {error && <span className={css.formError}>{error}</span>}
      </div>
    );
  },
);

UiInput.displayName = "UiInput";

export default UiInput;
