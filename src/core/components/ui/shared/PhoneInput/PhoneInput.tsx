//libs
import React from "react";
import clsx from "clsx";
import { IMaskInput } from "react-imask";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

//styles
import css from "@/core/components/ui/shared/TextInput/styles.module.scss";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

interface PhoneInputProps<T extends FieldValues> {
  className?: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  error?: string;
}
// TODO: не дает вводить некоторые цифры при вводе телефона, исправить

export const PhoneInput = <T extends FieldValues>({
  className,
  name,
  control,
  placeholder,
  error,
}: PhoneInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={clsx(css.inputContainer, className)}>
          <div className={clsx(css.inputWrap, error && css["inputWrap_error"])}>
            <IMaskInput
              className={clsx(css.input, error && css["input_error"])}
              mask="+7 (000) 000-00-00"
              unmask
              prepare={(chunk, masked) => (masked.unmaskedValue === "" ? chunk.replace(/^(\+?7|8)/, "") : chunk)}
              value={field.value ?? ""}
              onAccept={(value: string) => field.onChange(value)}
              onBlur={field.onBlur}
              inputRef={field.ref}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={placeholder}
            />
          </div>
          {error && (
            <Typography as="span" variant="tooltip" className={css.inputError}>
              {error}
            </Typography>
          )}
        </div>
      )}
    />
  );
};
