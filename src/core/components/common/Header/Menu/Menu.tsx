"use client";
//libs
import React from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

//styles
import css from "./styles.module.scss";

//assets
import HomeIcon from "@p/assets/icons/home.svg";
import CatalogIcon from "@p/assets/icons/menu-second.svg";
import HeartIcon from "@p/assets/icons/heart.svg";
import ShopingCartIcon from "@p/assets/icons/shopping-cart.svg";
import MenuIcon from "@p/assets/icons/menu.svg";

//components
import ButtonWithQuantity from "@/core/components/ui/shared/ButtonWithQuantity/ButtonWithQuantity";

interface MenuProps {
  className?: string;
  menuIsOpen: boolean;
  catalogIsOpen: boolean;
  toggleMenuState: () => void;
  toggleCatalogState: () => void;
}

export const Menu = ({ className, menuIsOpen, catalogIsOpen, toggleMenuState, toggleCatalogState }: MenuProps) => {
  const path = usePathname();

  return (
    <div className={clsx(css.menu, className)} data-weight>
      <div className={css.menuContent}>
        <ButtonWithQuantity text="Главная" as="router" href="/" active={path === "/"}>
          <HomeIcon />
        </ButtonWithQuantity>
        <ButtonWithQuantity text="Каталог" as="button" active={catalogIsOpen} onClick={toggleCatalogState}>
          <CatalogIcon />
        </ButtonWithQuantity>
        <ButtonWithQuantity quantity={20} text="Избранное" as="router" href="/" active={path === "/123"}>
          <HeartIcon />
        </ButtonWithQuantity>
        <ButtonWithQuantity quantity={20} text="Корзина" as="router" href="/" active={path === "/222"}>
          <ShopingCartIcon />
        </ButtonWithQuantity>
        <ButtonWithQuantity text="Меню" as="button" active={menuIsOpen} onClick={toggleMenuState}>
          <MenuIcon />
        </ButtonWithQuantity>
      </div>
    </div>
  );
};
