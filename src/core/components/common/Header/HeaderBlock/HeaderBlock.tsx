"use client";
//libs
import React from "react";
import Link from "next/link";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//assets
import MainLogo from "@p/assets/icons/logo.svg";
import MenuIcon from "@p/assets/icons/menu-second.svg";
import HeartIcon from "@p/assets/icons/heart.svg";
import ShopingCartIcon from "@p/assets/icons/shopping-cart.svg";
import CallIcon from "@p/assets/icons/call-20.svg";
import LocationIcon from "@p/assets/icons/location-full-color-20.svg";
import CloseIcon from "@p/assets/icons/close-square.svg";

//stores
import { useFavourites } from "@/core/store/useFavouritesStore";
import { useBasket } from "@/core/store/useBasketStore";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";
import ButtonWithQuantity from "@/core/components/ui/shared/ButtonWithQuantity/ButtonWithQuantity";
import SearchForm from "@/core/components/ui/shared/SearchForm/SearchForm";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";

interface HeaderBlockProps {
  className?: string;
  isOpen: boolean;
  toggleCatalogState: () => void;
}

export const HeaderBlock = ({ className, isOpen = false, toggleCatalogState }: HeaderBlockProps) => {
  const favouritesCount = useFavourites().length;
  const basketCount = useBasket().length;

  return (
    <div className={clsx(css.headerBlock, className)}>
      {/* Для MD и выше */}
      <div className={clsx(css.headerWrap, css.headerWrapDesktop)}>
        <Link href="/" className={css.link}>
          <MainLogo className={css.mainLogo} />
        </Link>
        <div className={css.wrapper}>
          <ButtonRounded
            text="Каталог"
            size="h56"
            leftIcon={isOpen ? <CloseIcon /> : <MenuIcon />}
            onClick={toggleCatalogState}
          />
          <SearchForm className={css.searchForm} />
        </div>
        <div className={css.buttonsWrap}>
          <ButtonWithQuantity quantity={favouritesCount} text="Избранное" as="router" href="/favourites" active={false}>
            <HeartIcon className={css.icon} />
          </ButtonWithQuantity>
          <ButtonWithQuantity quantity={basketCount} text="Корзина" as="router" href="/basket" active={false}>
            <ShopingCartIcon className={css.icon} />
          </ButtonWithQuantity>
        </div>
      </div>
      {/* Для SM и ниже */}
      <div className={clsx(css.headerWrap, css.headerWrapMobile)}>
        <Link href="/" className={css.link}>
          <MainLogo className={css.mainLogo} />
        </Link>
        <div className={css.buttonsWrap}>
          <Link href="tel:88122235059" className={css.phoneNumber}>
            <CallIcon className={css.callIcon} />
            <Typography as="span" variant="text4" className={css.phoneText}>
              8 (812) 223-50-59
            </Typography>
          </Link>
          <button className={css.locationButton}>
            <LocationIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
