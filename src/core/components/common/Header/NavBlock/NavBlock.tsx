//libs
import React from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//assets
import LocationIcon from "@p/assets/icons/location-full-color-20.svg";
import ChevronIcon from "@p/assets/icons/chevron-16.svg";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";
import Link from "next/link";

interface NavBlockProps {
  className?: string;
}

export const navItems = [
  {
    id: 1,
    title: "Доставка",
    path: "/delivery",
  },
  {
    id: 2,
    title: "Оплата",
    path: "/payment",
  },
  {
    id: 3,
    title: "О компании",
    path: "/about",
  },
  {
    id: 4,
    title: "Контакты",
    path: "/contacts",
  },
  {
    id: 5,
    title: "Акции",
    path: "/articles",
  },
];

// TODO: реализовать динамическое подтягивание номера и города
// TODO: реализовать функционал модалки

export const NavBlock = ({ className }: NavBlockProps) => {
  return (
    <div className={clsx(css.navBlock, className)}>
      <div className={css.navBlockContainer}>
        <div className={css.locationWrap}>
          <button className={css.locationButton}>
            <LocationIcon className={css.locationIcon} />
            <Typography as="span" variant="text4" className={css.cityName}>
              Москва
            </Typography>
            <ChevronIcon className={css.chevronIcon} />
          </button>
          <Typography as="a" href="tel:88122235059" variant="text4" className={css.phoneNumber}>
            8 (812) 223-50-59
          </Typography>
        </div>

        <nav className={css.navigation}>
          <ul className={css.navigationList}>
            {navItems.map((item) => (
              <li key={item.id} className={css.navigationItem}>
                <Typography as={Link} href={item.path} variant="text4" className={css.navigationLink}>
                  {item.title}
                </Typography>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
