//libs
import React from "react";
import Link from "next/link";

//styles
import styles from "./styles.module.scss";

//assets
import LocationIcon from "@p/assets/icons/location-full-color-20.svg";
import ChevronDownIcon from "@p/assets/icons/chevron-16.svg";
import LogoIcon from "@p/assets/icons/logo.svg";
import HeartIcon from "@p/assets/icons/heart.svg";
import ShopingCartIcon from "@p/assets/icons/shopping-cart.svg";
import MenuIcon from "@p/assets/icons/menu-second.svg";

//components
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import ButtonWithQuantity from "@/core/components/ui/shared/ButtonWithQuantity/ButtonWithQuantity";
import SearchForm from "@/core/components/ui/shared/SearchForm/SearchForm";
import Typography from "@/core/components/ui/shared/Typography/Typography";
import MobileHeader from "./MobileHeader/MobileHeader";
import { DesktopHeader } from "./DesktopHeader/DesktopHeader";

export const Header = () => {
  return (
    <header className={styles.header}>
      <DesktopHeader />
      <MobileHeader />
    </header>
  );
};
