//libs
import React, { InputHTMLAttributes } from "react";

//styles
import styles from "./styles.module.scss";

//components
import ButtonIconRounded from "@/core/components/ui/shared/ButtonIconRounded/ButtonIconRounded";

//assets
import ArrowRightIcon from "@p/assets/icons/arrow-right.svg";

interface UiFormProps extends InputHTMLAttributes<HTMLFormElement> {
  placeholder: string;
}

const UiForm = React.memo(({ placeholder, onSubmit }: UiFormProps) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.formLabel} htmlFor="input1">
        <input
          name="input1"
          className={styles.formInput}
          type="email"
          autoComplete="off"
          spellCheck="false"
          placeholder={placeholder}
        />
        <ButtonIconRounded>
          <ArrowRightIcon />
        </ButtonIconRounded>
      </label>
    </form>
  );
});

UiForm.displayName = "UiForm"

export default UiForm;
