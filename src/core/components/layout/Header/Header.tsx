"use client";
//libs
import React, { useEffect } from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//stores
import { useCatalogIsOpen, useSetCatalogClose } from "@/core/store/useCatalogStore";

//components
import { NavBlock } from "./NavBlock/NavBlock";
import { HeaderBlock } from "./HeaderBlock/HeaderBlock";
import { MenuCatalog } from "./MenuCatalog/MenuCatalog";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const catalogIsOpen = useCatalogIsOpen();
  const handleClodeMenu = useSetCatalogClose();

  //Закрытие меню по эскейп
  useEffect(() => {
    if (!catalogIsOpen) return;

    const onEscapeDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClodeMenu();
    };

    document.addEventListener("keydown", onEscapeDown);
    return () => document.removeEventListener("keydown", onEscapeDown);
  }, [catalogIsOpen, handleClodeMenu]);

  return (
    <header className={clsx(css.header, className)} data-weight>
      <NavBlock />
      <HeaderBlock isOpen={catalogIsOpen} />
      <div className={clsx(css.overlay, catalogIsOpen && css.overlayVisible)} onClick={handleClodeMenu}></div>
      <MenuCatalog
        isOpen={catalogIsOpen}
        className={clsx(css.menuCatalog, catalogIsOpen && css.menuCatalogOpen)}
        style={{ maxHeight: "calc(100% - var(--header-height) - 100px)" }}
      />
    </header>
  );
};
