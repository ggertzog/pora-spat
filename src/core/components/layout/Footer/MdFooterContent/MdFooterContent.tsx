//libs
import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//assets
import LogoIcon from "@p/assets/icons/logo.svg";
import TelegramLogo from "@p/assets/icons/telegram.svg";
import StarsImg from "@p/assets/images/stars.png";
import VKLogo from "@p/assets/icons/vk.svg";
import VisaIcon from "@p/assets/icons/visa.svg";
import MastercardIcon from "@p/assets/icons/master-card.svg";
import MirIcon from "@p/assets/icons/mir.svg";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";
import { ContactList } from "../ContactList/ContactList";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import { NavList } from "../NavList/NavList";
import UiForm from "@/core/components/ui/shared/UiForm/UiForm";

interface MdFooterContentProps {
  catalogItems: {
    title: string;
    items: {
      title: string;
      href: string;
    }[];
  };
  customersItems: {
    title: string;
    items: {
      title: string;
      href: string;
    }[];
  };

  contactItems: {
    text: string;
    href: string;
  }[];
}

export const MdFooterContent = ({contactItems, customersItems, catalogItems}: MdFooterContentProps) => {
  return (
    <div className={styles.footerContent}>
      <div className={styles.footerContentItem}>
        <div className={styles.orderCall}>
          <Typography className={styles.title} as="h6" variant="h6">
            Связаться с нами
          </Typography>
          <ContactList data={contactItems} />
          <ButtonRounded className={styles.orderCallButton} text="Заказать звонок" size="h44" />
        </div>

        <div className={styles.operatingMode}>
          <Typography className={styles.title} as="h6" variant="h6">
            Режим работы call-центра
          </Typography>
          <Typography className={styles.text} as="p" variant="text3">
            с 9:00 до 22:00
          </Typography>
        </div>

        <div className={styles.deliveryHours}>
          <Typography className={styles.title} as="h6" variant="h6">
            Доставка заказов
          </Typography>
          <Typography className={styles.text} as="p" variant="text3">
            с 9:00 до 23:00
          </Typography>
        </div>

        <div className={styles.address}>
          <Typography className={styles.title} as="h6" variant="h6">
            Адрес
          </Typography>
          <Typography className={styles.text} as="p" variant="text3">
            Москва, Кантемировкая уица, дом 3, офис 32
          </Typography>
        </div>

        <div className={styles.socialMedia}>
          <Typography className={styles.title} as="h6" variant="h6">
            Соц. сети
          </Typography>
          <div className={styles.socialMediaList}>
            <Link className={styles.socialMediaItem} href="/">
              <TelegramLogo className={styles.socialMediaIcon} />
            </Link>
            <Link className={styles.socialMediaItem} href="/">
              <VKLogo className={styles.socialMediaIcon} />
            </Link>
          </div>
        </div>

        <div className={styles.logoWrapper}>
          <LogoIcon />
          <Typography className={styles.logoText} as="span" variant="tooltip2">
            Мебельный интернет магазин
          </Typography>
        </div>
      </div>

      <div className={styles.footerContentItem}>
        <div className={styles.subscription}>
          <Typography className={styles.title} as="h6" variant="h6">
            Подпишитесь на рассылку и получите скидку на первый заказ
          </Typography>
          <UiForm placeholder="Введите ваш email" />
        </div>

        <NavList title={customersItems.title} items={customersItems.items} className={styles.navList} />

        <div className={styles.paymentSystems}>
          <Typography className={styles.title} as="h6" variant="h6">
            Платежные системы
          </Typography>
          <div className={styles.paymentSystemsList}>
            <Link className={styles.paymentSystemItem} href="/">
              <MastercardIcon />
            </Link>
            <Link className={styles.paymentSystemItem} href="/">
              <VisaIcon />
            </Link>
            <Link className={styles.paymentSystemItem} href="/">
              <MirIcon />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.footerContentItem}>
        <NavList title={catalogItems.title} items={catalogItems.items} />
        <div className={styles.rating}>
          <Typography className={styles.title} as="h6" variant="h6">
            Рейтинг
          </Typography>
          <ul className={styles.ratingList}>
            <li>
              <Link className={clsx(styles.text, styles.ratingLink)} target="_blank" href="/">
                Я. Маркет
                <Image src={StarsImg} alt="Stars" width={120} height={20} />
              </Link>
            </li>
            <li>
              <Link className={clsx(styles.text, styles.ratingLink)} target="_blank" href="/">
                Ozon
                <Image src={StarsImg} alt="Stars" width={120} height={20} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
