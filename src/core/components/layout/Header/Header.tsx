//libs
import React from "react";
import Link from "next/link";

//styles
import styles from "./styles.module.scss";

//assets
import LocationIcon from "@p/assets/icons/location.svg";
import ChevronDownIcon from "@p/assets/icons/chevron.svg";
import LogoIcon from "@p/assets/icons/logo.svg";

//components
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import ButtonWithQuantity from "@/core/components/ui/shared/ButtonWithQuantity/ButtonWithQuantity";
import SearchForm from "@/core/components/ui/shared/SearchForm/SearchForm";
import Typography from "@/core/components/ui/shared/Typography/Typography";
import MobileHeader from "./MobileHeader/MobileHeader";

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

export const Header = () => {
  return (
    <header className={styles.header}>
      <>
        <div className={styles.navWrap}>
          <div className={styles.navContainer}>
            <div className={styles.contacts}>
              <button className={styles.locationBtn}>
                <LocationIcon className={styles.locationIcon} />
                <Typography as="span" variant="text4">
                  Санкт-Петербург
                </Typography>
                <ChevronDownIcon className={styles.chevronIcon} />
              </button>
              <Typography className={styles.phone} as="a" variant="text4" href="tel:88122235059">
                8 (812) 223-50-59
              </Typography>
            </div>
            <nav className={styles.nav}>
              <ul className={styles.navList}>
                {linksArr.map((item) => (
                  <li key={item.id}>
                    <Link className={styles.link} href={item.link}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className={styles.mainWrap}>
          <div className={styles.mainContainer}>
            <Link className={styles.logoLink} href="/">
              <LogoIcon className={styles.logoIcon} />
            </Link>
            <div className={styles.searchWrap}>
              <ButtonRounded icon="catalog" text="Каталог" size="h56" className={styles.catalogButton} />
              <SearchForm />
            </div>
            <div className={styles.buttonsWrap}>
              <ButtonWithQuantity icon="favorite" quantity={0} text="Избранное" size="xs" />
              <ButtonWithQuantity icon="basket" quantity={0} text="Корзина" size="xs" />
            </div>
          </div>
        </div>
      </>
      <MobileHeader />
    </header>
  );
};
