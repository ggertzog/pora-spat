'use client';
import React from 'react'
import { useMediaQuery } from '@/core/utils/hooks/useMediaQuery';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { ButtonRounded } from '../../ui/ButtonRounded/ButtonRounded';
import TelegramLogo from '@p/assets/icons/telegram.svg';
import VKLogo from '@p/assets/icons/vk.svg';
import LogoIcon from '@p/assets/icons/logo.svg';
import StarsImg from '@p/assets/images/stars.png';
import MastercardIcon from '@p/assets/icons/master-card.svg';
import VisaIcon from '@p/assets/icons/visa.svg';
import MirIcon from '@p/assets/icons/mir.svg';
import GRCHLogo from '@p/assets/images/grch.png';
import clsx from 'clsx';
import { NavList } from './NavList/NavList';
import { catalogItems, customersItems, contactItems } from './mock-data';
import { UiForm } from '../../ui/UiForm/UiForm';
import { ContactList } from './ContactList/ContactList';

export const Footer = () => {
  const isXlLayout = useMediaQuery('(min-width: 1440px)');
  const isMdLayout = useMediaQuery('(min-width: 768px) and (max-width: 1439px)');
  const isSmLayout = useMediaQuery('(max-width: 767px)' );

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {isXlLayout && <div className={styles.footerContent}>

          <div className={styles.footerContentLeftItem}>
            <div className={styles.footerContentItem}>

              <div className={styles.orderCall}>
                <h6 className={styles.title}>
                  Связаться с нами
                </h6>
                <ContactList data={contactItems} />
                <ButtonRounded className={styles.orderCallButton} text="Заказать звонок" size="h44" />
              </div>

              <div className={styles.address}>
                <h6 className={styles.title}>Адрес</h6>
                <p className={styles.text}>Москва, Кантемировкая уица, дом 3, офис 32</p>
              </div>

              <div className={styles.logoWrapper}>
                <LogoIcon />
                <span className={styles.logoText}>Мебельный интернет магазин</span>
              </div>

            </div>

            <div className={styles.footerContentItem}>

              <div className={styles.operatingMode}>
                <h6 className={styles.title}>Режим работы call-центра</h6>
                <p className={styles.text}>
                  с 9:00 до 22:00
                </p>
              </div>

              <div className={styles.deliveryHours}>
                <h6 className={styles.title}>Доставка заказов</h6>
                <p className={styles.text}>
                  с 9:00 до 23:00
                </p>
              </div>

              <div className={styles.socialMedia}>
                <h6 className={styles.title}>Соц. сети</h6>
                <div className={styles.socialMediaList}>
                  <Link className={styles.socialMediaItem} href="/">
                    <TelegramLogo className={styles.socialMediaIcon} />
                  </Link>
                  <Link className={styles.socialMediaItem} href="/">
                    <VKLogo className={styles.socialMediaIcon} />
                  </Link>
                </div>
              </div>

            </div>
          </div>


          <div className={styles.footerContentItem}>
            <div className={styles.footerNavigation}>
              <NavList title={catalogItems.title} items={catalogItems.items} />
              <NavList title={customersItems.title} items={customersItems.items} />
            </div>

            <div className={styles.subscription}>
              <h6 className={styles.title}>Подпишитесь на рассылку и получите скидку на первый заказ</h6>
              <UiForm placeholder="Введите ваш email" />
            </div>

          </div>

          <div className={styles.footerContentItem}>
            <div className={styles.rating}>
              <h6 className={styles.title}>Рейтинг</h6>
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

            <div className={styles.paymentSystems}>
              <h6 className={styles.title}>Платежные системы</h6>
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
        </div>}
        {isMdLayout && <div className={styles.footerContent}>
          <div className={styles.footerContentItem}>
            <div className={styles.orderCall}>
              <h6 className={styles.title}>
                Связаться с нами
              </h6>
              <ContactList data={contactItems} />
              <ButtonRounded className={styles.orderCallButton} text="Заказать звонок" size="h44" />
            </div>

            <div className={styles.operatingMode}>
              <h6 className={styles.title}>Режим работы call-центра</h6>
              <p className={styles.text}>
                с 9:00 до 22:00
              </p>
            </div>

            <div className={styles.deliveryHours}>
              <h6 className={styles.title}>Доставка заказов</h6>
              <p className={styles.text}>
                с 9:00 до 23:00
              </p>
            </div>

            <div className={styles.address}>
              <h6 className={styles.title}>Адрес</h6>
              <p className={styles.text}>Москва, Кантемировкая уица, дом 3, офис 32</p>
            </div>

            <div className={styles.socialMedia}>
              <h6 className={styles.title}>Соц. сети</h6>
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
              <span className={styles.logoText}>Мебельный интернет магазин</span>
            </div>

          </div>

          <div className={styles.footerContentItem}>
            <div className={styles.subscription}>
              <h6 className={styles.title}>Подпишитесь на рассылку и получите скидку на первый заказ</h6>
              <UiForm placeholder="Введите ваш email" />
            </div>

            <NavList title={customersItems.title} items={customersItems.items} className={styles.navList} />

            <div className={styles.paymentSystems}>
              <h6 className={styles.title}>Платежные системы</h6>
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
              <h6 className={styles.title}>Рейтинг</h6>
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
        </div>}
        {isSmLayout && <div className={styles.footerContent}>
          <div className={styles.subscription}>
            <h6 className={styles.title}>Подпишитесь на рассылку и получите скидку на первый заказ</h6>
            <UiForm placeholder="Введите ваш email" />
          </div>

          <div className={styles.orderCall}>
            <h6 className={styles.title}>
              Связаться с нами
            </h6>
            <ContactList data={contactItems} />
            <ButtonRounded className={styles.orderCallButton} text="Заказать звонок" size="h44" />
          </div>

          <div className={styles.operatingMode}>
            <h6 className={styles.title}>Режим работы call-центра</h6>
            <p className={styles.text}>
              с 9:00 до 22:00
            </p>
          </div>

          <div className={styles.deliveryHours}>
            <h6 className={styles.title}>Доставка заказов</h6>
            <p className={styles.text}>
              с 9:00 до 23:00
            </p>
          </div>

          <div className={styles.address}>
            <h6 className={styles.title}>Адрес</h6>
            <p className={styles.text}>Москва, Кантемировкая уица, дом 3, офис 32</p>
          </div>

          <div className={styles.socialMedia}>
            <h6 className={styles.title}>Соц. сети</h6>
            <div className={styles.socialMediaList}>
              <Link className={styles.socialMediaItem} href="/">
                <TelegramLogo className={styles.socialMediaIcon} />
              </Link>
              <Link className={styles.socialMediaItem} href="/">
                <VKLogo className={styles.socialMediaIcon} />
              </Link>
            </div>
          </div>

          {/* Сделать dropdown */}
          <div className={styles.dropdownWrapper}>

          </div>

          <div className={styles.paymentSystems}>
            <h6 className={styles.title}>Платежные системы</h6>
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

          <div className={styles.rating}>
            <h6 className={styles.title}>Рейтинг</h6>
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

          <div className={styles.logoWrapper}>
            <LogoIcon />
            <span className={styles.logoText}>Мебельный интернет магазин</span>
          </div>
        </div>}

        <div className={styles.legal}>
          <span className={styles.legalText}>&copy;&nbsp;2024</span>
          <div className={styles.legalLinks}>
            <Link href="/" className={styles.legalText}>Политика конфиденциальности</Link>
            <Link href="/" className={styles.legalText}>Оферта</Link>
          </div>
          <Link href="/" className={styles.legalText}>
            Сделано в{' '}
            <Image src={GRCHLogo} alt="GRCH" width={54} height={15} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

