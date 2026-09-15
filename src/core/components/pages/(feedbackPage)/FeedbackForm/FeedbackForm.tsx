"use client";
//libs
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//styles
import css from "./styles.module.scss";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";
import { TextInput } from "@/core/components/ui/shared/TextInput/TextInput";
import { FileInput } from "../FileInput/FileInput";
import UiCheckBox from "@/core/components/ui/shared/UiCheckBox/UiCheckBox";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import { PhoneInput } from "@/core/components/ui/shared/PhoneInput/PhoneInput";

//api
import { IAppealError, useFeedbackForm } from "@/core/api/queryFetchers/postFeedbackForm";

//types
import { FileFieldName, FileItem, FilesState } from "../types";

//schemas
import { feedbackFormSchema } from "@/core/schemas/feedbackFormSchema";

interface FeedbackFormProps {
  className?: string;
}

type FeedbackFormData = z.infer<typeof feedbackFormSchema>;

type FileField = { name: FileFieldName; title: string; text?: string; accept: string };

const MAX_FILES_PER_FIELD = 3;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const IMAGE_ACCEPT = ".jpg,.jpeg,.png";
const VIDEO_ACCEPT = ".mp4,.mov,.wmv,.avi,.mpg";

const FILE_FIELDS: FileField[] = [
  { name: "photo_product", title: "Фото товара", accept: IMAGE_ACCEPT },
  { name: "photo_defect", title: "Фото дефекта", text: "При наличии", accept: IMAGE_ACCEPT },
  { name: "video", title: "Видео, если необходимо продемонстрировать работу механизмов", accept: VIDEO_ACCEPT },
  { name: "photo_packaging", title: "Фото упаковки", text: "Обязательно при возврате", accept: IMAGE_ACCEPT },
];

const EMPTY_FILES: FilesState = { photo_product: [], photo_defect: [], video: [], photo_packaging: [] };

// ключи ошибок валидации бэкенда -> поля формы
const API_FIELD_TO_FORM_FIELD: Partial<Record<string, keyof FeedbackFormData>> = {
  first_name: "firstName",
  last_name: "lastName",
  email: "email",
  phone: "phone",
  message: "appeal",
};

const isAcceptedFile = (file: File, accept: string) =>
  accept.split(",").some((extension) => file.name.toLowerCase().endsWith(extension.trim().toLowerCase()));

const isFileFieldName = (value: string): value is FileFieldName => FILE_FIELDS.some((field) => field.name === value);

export const FeedbackForm = ({ className }: FeedbackFormProps) => {
  const [files, setFiles] = useState<FilesState>(EMPTY_FILES);
  const [fileErrors, setFileErrors] = useState<Partial<Record<FileFieldName, string>>>({});

  const { mutate, isPending, isSuccess, error } = useFeedbackForm();

  const filesRef = useRef(files);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(
    () => () => {
      Object.values(filesRef.current)
        .flat()
        .forEach((item) => URL.revokeObjectURL(item.preview));
    },
    [],
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackFormSchema),
    mode: "onTouched",
    defaultValues: { firstName: "", lastName: "", email: "", phone: "", appeal: "" },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, field: FileField) => {
    const uploadedFiles = Array.from(event.target.files ?? []);
    // сбрасываем инпут, иначе повторный выбор того же файла не вызовет change
    event.target.value = "";
    if (uploadedFiles.length === 0) return;

    const errorMessages: string[] = [];

    const acceptedFiles = uploadedFiles.filter((file) => {
      if (!isAcceptedFile(file, field.accept)) {
        errorMessages.push("Неподдерживаемый формат файла");
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        errorMessages.push("Размер файла должен быть менее 10МБ");
        return false;
      }
      return true;
    });

    const freeSlots = Math.max(MAX_FILES_PER_FIELD - files[field.name].length, 0);
    if (acceptedFiles.length > freeSlots) {
      errorMessages.push(`Не более ${MAX_FILES_PER_FIELD} файлов в блоке`);
    }

    const addedFiles: FileItem[] = acceptedFiles
      .slice(0, freeSlots)
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));

    setFiles((prev) => ({
      ...prev,
      [field.name]: [...prev[field.name], ...addedFiles].slice(0, MAX_FILES_PER_FIELD),
    }));

    setFileErrors((prev) => ({
      ...prev,
      [field.name]: Array.from(new Set(errorMessages)).join(". ") || undefined,
    }));
  };

  const handleFileRemove = (fieldName: FileFieldName, preview: string) => {
    URL.revokeObjectURL(preview);

    setFiles((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((item) => item.preview !== preview),
    }));

    setFileErrors((prev) => ({ ...prev, [fieldName]: undefined }));
  };

  const handleServerError = (serverError: IAppealError) => {
    const serverFieldErrors = (serverError.errors ?? {}) as Record<string, string[] | undefined>;

    Object.entries(serverFieldErrors).forEach(([apiField, messages]) => {
      const message = messages?.[0];
      if (!message) return;

      // для массивов бэкенд присылает ключи вида photo_product.0
      const [baseField = apiField] = apiField.split(".");

      const formField = API_FIELD_TO_FORM_FIELD[baseField];
      if (formField) {
        setError(formField, { message });
        return;
      }

      if (isFileFieldName(baseField)) {
        setFileErrors((prev) => ({ ...prev, [baseField]: message }));
      }
    });
  };

  const onSubmit = (data: FeedbackFormData) => {
    const formData = new FormData();

    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("phone", `+7${data.phone}`);
    formData.append("message", data.appeal);
    // пустой email бэкенд не примет, поле необязательное — не отправляем вовсе
    if (data.email) formData.append("email", data.email);

    FILE_FIELDS.forEach((field) => {
      files[field.name].forEach((item) => formData.append(`${field.name}[]`, item.file));
    });

    mutate(formData, {
      onSuccess: () => {
        reset();
        Object.values(files)
          .flat()
          .forEach((item) => URL.revokeObjectURL(item.preview));
        setFiles(EMPTY_FILES);
        setFileErrors({});
      },
      onError: handleServerError,
    });
  };

  const getStatusMessage = () => {
    if (isSuccess) return "Обращение отправлено. Мы свяжемся с вами";
    if (!error) return "";
    // сетевой сбой приходит обычным Error, а не телом ответа
    if (error instanceof Error) return "Не удалось отправить обращение. Проверьте соединение и попробуйте ещё раз";
    if (Object.keys(error.errors ?? {}).length > 0) return "Проверьте правильность заполнения полей";
    return error.message || "Не удалось отправить обращение. Попробуйте позже";
  };

  const statusMessage = getStatusMessage();

  return (
    <form className={clsx(css.feedbackForm, className)} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={css.inputsBlock}>
        <Typography className={css.inputsBlockTitle} as="h4" variant="h4">
          Контактные данные
        </Typography>
        <div className={css.inputsBlockWrap}>
          <TextInput name="firstName" register={register} placeholder="Имя*" error={errors.firstName?.message} />
          <TextInput name="lastName" register={register} placeholder="Фамилия*" error={errors.lastName?.message} />
          <TextInput name="email" register={register} placeholder="Email" type="email" error={errors.email?.message} />
          <PhoneInput name="phone" control={control} placeholder="Телефон*" error={errors.phone?.message} />
        </div>
      </div>

      <div className={css.inputsBlock}>
        <Typography className={css.inputsBlockTitle} as="h4" variant="h4">
          Обращение
        </Typography>
        <div className={css.inputsBlockWrap}>
          <div className={css.textareaContainer}>
            <div className={clsx(css.textareaWrap, errors.appeal && css.textareaWrap_error)}>
              <textarea {...register("appeal")} className={css.textarea} placeholder="Ваш вопрос или обращение*" />
            </div>
            {errors.appeal && (
              <Typography as="span" variant="tooltip" className={css.textareaError}>
                {errors.appeal.message}
              </Typography>
            )}
          </div>
        </div>
      </div>

      <div className={css.inputsBlock}>
        <Typography className={css.inputsBlockTitle} as="h4" variant="h4">
          Фото/видео
        </Typography>
        <div className={css.inputsBlockContent}>
          <div className={css.textWrap}>
            <Typography as="p" variant="text1">
              Прикрепите фото/видео с&nbsp;дефектом. На&nbsp;них должно быть видно, что товар не&nbsp;использовался
              и&nbsp;сохранил свой товарный вид
            </Typography>
            <Typography as="p" variant="text3">
              .jpg, jpeg, png, mp4, mov, wmv, avi, mpg менее 10МБ, не&nbsp;более 3-х фото/видео для каждого блока
            </Typography>
          </div>
          <div className={css.inputsBlockWrap}>
            {FILE_FIELDS.map((field) => (
              <FileInput
                key={field.name}
                multiple
                id={field.name}
                name={field.name}
                accept={field.accept}
                title={field.title}
                text={field.text}
                files={files[field.name]}
                error={fileErrors[field.name]}
                disabled={files[field.name].length >= MAX_FILES_PER_FIELD}
                onChange={(event) => handleFileChange(event, field)}
                onRemove={(preview) => handleFileRemove(field.name, preview)}
              />
            ))}
          </div>
          <div className={css.submitBlock}>
            <div className={css.checkboxWrap}>
              <UiCheckBox variant="square" color="vanilla" type="checkbox" />
              <Typography as="p" variant="text4" className={css.checkboxText}>
                Соглашаюсь с{" "}
                <Typography as="a" variant="text4" href="#">
                  политикой конфиденциальности
                </Typography>
              </Typography>
            </div>

            <ButtonRounded
              type="submit"
              text={isPending ? "Отправляем..." : "Отправить обращение"}
              size="h56"
              disabled={isPending}
            />

            {statusMessage && (
              <Typography as="p" variant="text4" className={clsx(css.statusMessage, error && css.statusMessage_error)}>
                {statusMessage}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
