"use client";
//libs
import React from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//hooks
import { useScrollLock } from "@/core/utils/hooks/useScrollLock";

interface ModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  menu?: boolean;
  catalog?: boolean;
}

export const Modal = ({ className, isOpen, onClose, children, menu = false, catalog = false }: ModalProps) => {
  useScrollLock(isOpen);

  return (
    <dialog className={clsx(css.modal, menu && css.modal_menu, catalog && css.modal_catalog, className)} open={isOpen}>
      <div className={css.overlay} role="button" onClick={onClose}></div>
      <div className={css.content}>{children}</div>
    </dialog>
  );
};
