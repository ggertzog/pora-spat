import React from 'react';
import styles from './styles.module.scss';
import LocationIcon from '@p/assets/icons/location.svg';
import ChevronDownIcon from '@p/assets/icons/chevron.svg';
import LogoIcon from '@p/assets/icons/logo.svg';
import CallIcon from '@p/assets/icons/call.svg';
import Link from 'next/link';
import { ButtonRounded } from '@/core/components/ui/ButtonRounded/ButtonRounded';
import { ButtonWithQuantity } from '@/core/components/ui/ButtonWithQuantity/ButtonWithQuantity';
import { SearchForm } from '@/core/components/ui/SearchForm/SearchForm';

export const Header = () => {
    return (
        <header className={styles.header}>
            <>
                <div className={styles.navWrap}>
                    <div className={styles.navContainer}>
                        <div className={styles.contacts}>
                            <button className={styles.locationBtn}>
                                <LocationIcon className={styles.locationIcon} />
                                <p>Санкт-Петербург</p>
                                <ChevronDownIcon className={styles.chevronIcon} />
                            </button>
                            <a href="tel:88122235059" className={styles.phone}>8 (812) 223-50-59</a>
                        </div>
                        <nav className={styles.nav}>
                            <ul className={styles.navList}>
                                <li>
                                    <Link className={styles.link} href="/">Доставка</Link>
                                </li>
                                <li>
                                    <Link className={styles.link} href="/">Оплата</Link>
                                </li>
                                <li>
                                    <Link className={styles.link} href="/">О компании</Link>
                                </li>
                                <li>
                                    <Link className={styles.link} href="/">Контакты</Link>
                                </li>
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
                            <ButtonRounded icon="catalog" text='Каталог' size="h56" className={styles.catalogButton} />
                            <SearchForm />
                        </div>
                        <div className={styles.buttonsWrap}>
                            <ButtonWithQuantity icon="favorite" quantity={0} text='Избранное' size='xs' />
                            <ButtonWithQuantity icon="basket" quantity={0} text='Корзина' size='xs' />
                        </div>
                    </div>
                </div>
            </>
            <div className={styles.mobileHeader}>
                <Link className={styles.logoLink} href="/">
                    <LogoIcon className={styles.logoIcon} />
                </Link>
                <div className={styles.buttonsMobileWrap}>
                    <a href="tel:88122235059" className={styles.phone}>
                        <CallIcon className={styles.callIcon} />
                        8 (812) 223-50-59
                    </a>
                    <button className={styles.locationBtnMobile}>
                        <LocationIcon className={styles.locationIcon} />
                    </button>
                </div>
            </div>

        </header>
    )
}
