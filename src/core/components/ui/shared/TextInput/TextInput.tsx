//libs
import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

//styles
import css from "./styles.module.scss";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
}

export const TextInput = <T extends FieldValues>({
  className,
  name,
  register,
  type = "text",
  error,
  ...props
}: InputProps<T>) => {
  return (
    <div className={clsx(css.inputContainer, className)}>
      <div className={clsx(css.inputWrap, error && css["inputWrap_error"])}>
        <input className={clsx(css.input, error && css["input_error"])} type={type} {...props} {...register(name)} />
      </div>
      {error && (
        <Typography as="span" variant="tooltip" className={css.inputError}>
          {error}
        </Typography>
      )}
    </div>
  );
};
