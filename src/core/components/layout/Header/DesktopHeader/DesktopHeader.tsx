//libs
import React from "react";
import Link from "next/link";

//css
import css from "./styles.module.scss";

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

interface DesktopHeaderProps {
  className?: string;
}

export const DesktopHeader = ({ className }: DesktopHeaderProps) => {
  const linksArr = [
    {
      id: 1,
      title: "Доставка",
      link: "/1",
    },
    {
      id: 2,
      title: "Оплата",
      link: "/2",
    },
    {
      id: 3,
      title: "О компании",
      link: "/3",
    },
    {
      id: 4,
      title: "Контакты",
      link: "/4",
    },
  ];

  return (
    <>
      <div className={css.navWrap}>
        <div className={css.navContainer}>
          <div className={css.contacts}>
            <button className={css.locationBtn}>
              <LocationIcon className={css.locationIcon} />
              <Typography as="span" variant="text4">
                Санкт-Петербург
              </Typography>
              <ChevronDownIcon className={css.chevronIcon} />
            </button>
            <Typography className={css.phone} as="a" variant="text4" href="tel:88122235059">
              8 (812) 223-50-59
            </Typography>
          </div>
          <nav className={css.nav}>
            <ul className={css.navList}>
              {linksArr.map((item) => (
                <li key={item.id}>
                  <Link className={css.link} href={item.link}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className={css.mainWrap}>
        <div className={css.mainContainer}>
          <Link className={css.logoLink} href="/">
            <LogoIcon className={css.logoIcon} />
          </Link>
          <div className={css.searchWrap}>
            <ButtonRounded
              text="Каталог"
              size="h56"
              variant="main"
              textSize="big"
              className={css.catalogButton}
              leftIcon={<MenuIcon />}
            />
            <SearchForm />
          </div>
          <div className={css.buttonsWrap}>
            <ButtonWithQuantity quantity={0} text="Избранное" size="xs">
              <HeartIcon className={css.icon} />
            </ButtonWithQuantity>
            <ButtonWithQuantity quantity={0} text="Корзина" size="xs">
              <ShopingCartIcon className={css.icon} />
            </ButtonWithQuantity>
          </div>
        </div>
      </div>
    </>
  );
};
