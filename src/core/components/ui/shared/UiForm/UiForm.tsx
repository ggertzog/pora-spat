//libs
import React, { InputHTMLAttributes } from "react";

//styles
import styles from "./styles.module.scss";

//components
import ButtonIconRounded from "@/core/components/ui/shared/ButtonIconRounded/ButtonIconRounded";

interface UiFormProps extends InputHTMLAttributes<HTMLFormElement> {
  placeholder: string;
}

const UiForm = ({ placeholder, onSubmit }: UiFormProps) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.formLabel} htmlFor="">
        <input className={styles.formInput} type="email" placeholder={placeholder} />
        <ButtonIconRounded icon="arrowRight" />
        {/* <span></span> */}
      </label>
    </form>
  );
};

export default UiForm;
