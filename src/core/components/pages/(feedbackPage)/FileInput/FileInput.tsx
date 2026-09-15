"use client";
//libs
import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//assets
import PhotoIcon from "@p/assets/icons/photo.svg";
import CloseIcon from "@p/assets/icons/close-20.svg";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

//types
import { FileItem } from "../types";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  text?: string;
  files?: FileItem[];
  error?: string;
  onRemove?: (preview: string) => void;
}

export const FileInput = ({
  className,
  type = "file",
  title,
  text,
  files = [],
  error,
  disabled,
  onRemove,
  ...props
}: FileInputProps) => {
  return (
    <div className={clsx(css.fileInputWrap, className)}>
      <label className={clsx(css.label, disabled && css.label_disabled)}>
        <input className={css.input} type={type} disabled={disabled} {...props} />
        <div className={css.iconWrap}>
          <PhotoIcon className={css.icon} />
        </div>
      </label>
      {files.length > 0 && (
        <ul className={css.fileList}>
          {files.map((item) => (
            <li className={css.fileItem} key={item.preview}>
              {item.file.type.startsWith("video/") ? (
                <video className={css.preview} src={item.preview} muted playsInline />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- превью локального файла по blob-ссылке, next/image тут не нужен
                <img className={css.preview} src={item.preview} alt={item.file.name} />
              )}
              {onRemove && (
                <button
                  className={css.removeButton}
                  type="button"
                  aria-label={`Удалить ${item.file.name}`}
                  onClick={() => onRemove(item.preview)}
                >
                  <CloseIcon className={css.removeIcon} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className={css.textWrap}>
        <Typography className={css.title} as="h6" variant="h6">
          {title}
        </Typography>
        {text && (
          <Typography className={css.text} as="p" variant="text4">
            {text}
          </Typography>
        )}
        {error && (
          <Typography className={css.error} as="span" variant="tooltip">
            {error}
          </Typography>
        )}
      </div>
    </div>
  );
};
