//libs
import React from "react";
import Link from "next/link";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//assets
import LocationIcon from "@p/assets/icons/location-full-color-20.svg";
import Callicon from "@p/assets/icons/call-full-color-20.svg";
import MailIcon from "@p/assets/icons/mail-full-color-20.svg";
import CloseIcon from "@p/assets/icons/close-square.svg";

//components
import { Modal } from "@/core/components/common/Modal/Modal";
import Typography from "@/core/components/ui/shared/Typography/Typography";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";

interface MenuModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const firstLinksList = [
  {
    title: "Доставка",
    link: "/delivery",
  },
  { title: "Оплата", link: "/payment" },
  { title: "Контакты", link: "/contacts" },
];

const secondLinksList = [
  {
    title: "Обмен и возврат",
    link: "/",
  },
  { title: "О компании", link: "/about" },
];

export const MenuModal = ({ className, isOpen, onClose }: MenuModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} menu>
      <div className={clsx(css.menuModal, className)} data-weight>
        <button className={css.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
        <div className={css.listWrap}>
          <ul className={css.linksWrap}>
            {firstLinksList.map((item, index) => (
              <li key={index}>
                <Typography variant="h4" as={Link} href={item.link} className={css.link}>
                  {item.title}
                </Typography>
              </li>
            ))}
          </ul>
          <ul className={css.linksWrap}>
            {secondLinksList.map((item, index) => (
              <li key={index}>
                <Typography as={Link} variant="text3" href={item.link} className={css.secondaryLink}>
                  {item.title}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
        <div className={css.footer}>
          <ButtonRounded text="Заказать звонок" size="h43" className={css.callButton} />
          <div className={css.footerContentWrap}>
            <button className={css.locationButton}>
              <LocationIcon />
              <Typography as="span" variant="text4">
                Москва
              </Typography>
            </button>
            <Typography as="a" variant="text4" href="tel:88006060606" className={css.callLink}>
              <Callicon />
              <Typography as="span" variant="text4">
                8 800 606-06-06
              </Typography>
            </Typography>
            <Typography as="a" variant="text4" href="mailto:info@mail.ru" className={css.callLink}>
              <MailIcon />
              <Typography as="span" variant="text4">
                info@mail.ru
              </Typography>
            </Typography>
          </div>
        </div>
      </div>
    </Modal>
  );
};
