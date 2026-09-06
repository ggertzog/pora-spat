"use client";
//libs
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import throttle from "lodash.throttle";

//styles
import css from "./styles.module.scss";

//stores
import { useCatalogIsOpen, useSetCatalogClose, useToggleCatalogState } from "@/core/store/useCatalogStore";
import { useCloseMenu, useMenuIsOpen, useToggleMenuState } from "@/core/store/useMenuStore";

//query fetchers
import { useRunningLineQuery } from "@/core/api/queryFetchers/getRunningLineQuery";

//components
import { NavBlock } from "./NavBlock/NavBlock";
import { HeaderBlock } from "./HeaderBlock/HeaderBlock";
import { MenuCatalog } from "./MenuCatalog/MenuCatalog";
import { RunningLine } from "./RunningLine/RunningLine";
import { Menu } from "./Menu/Menu";
import { MenuModal } from "./MenuModal/MenuModal";
import { CatalogModal } from "./CatalogModal/CatalogModal";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const { data: runningLineData } = useRunningLineQuery();

  //фильтрация running line по наличию атрибута is_active
  const filteredRunningLine = runningLineData?.filter((item) => item.is_active && item.is_active === true);

  //стейт каталога
  const catalogIsOpen = useCatalogIsOpen();
  const handleCloseCatalog = useSetCatalogClose();
  const handleToggleCatalogState = useToggleCatalogState();

  //стейт меню
  const menuIsOpen = useMenuIsOpen();
  const handleCloseMenu = useCloseMenu();
  const handleToggleMenuState = useToggleMenuState();

  const [isPageScrolled, setIsPageScrolled] = useState<boolean>(false);

  //Слушатель скролла страницы
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY;
      setIsPageScrolled(scrollY > 50);
    }, 100);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //Закрытие меню по эскейп
  useEffect(() => {
    if (!catalogIsOpen) return;

    const onEscapeDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseCatalog();
    };

    document.addEventListener("keydown", onEscapeDown);
    return () => document.removeEventListener("keydown", onEscapeDown);
  }, [catalogIsOpen, handleCloseCatalog]);

  return (
    <header className={clsx(css.header, className)} data-weight>
      <div className={clsx(css.headerTopContent, isPageScrolled && css.headerTopContent_hidden)}>
        {filteredRunningLine && filteredRunningLine.length > 0 && <RunningLine data={filteredRunningLine} />}
        <NavBlock />
      </div>
      <HeaderBlock isOpen={catalogIsOpen} toggleCatalogState={handleToggleCatalogState} />
      <div className={clsx(css.overlay, catalogIsOpen && css.overlayVisible)} onClick={handleCloseCatalog}></div>
      <MenuCatalog
        isOpen={catalogIsOpen}
        className={clsx(css.menuCatalog, catalogIsOpen && css.menuCatalogOpen)}
        style={{ maxHeight: "calc(100% - var(--header-height) - 100px)" }}
      />
      <Menu
        className={css.mobileHeaderMenu}
        menuIsOpen={menuIsOpen}
        catalogIsOpen={catalogIsOpen}
        toggleMenuState={handleToggleMenuState}
        toggleCatalogState={handleToggleCatalogState}
      />
      <MenuModal isOpen={menuIsOpen} className={css.menuModal} onClose={handleCloseMenu} />
      <CatalogModal isOpen={catalogIsOpen} className={css.catalogModal} onClose={handleCloseCatalog} />
    </header>
  );
};
